const _ = require('lodash')
const { Path } = require('path-parser');
const {URL} = require('url')
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireLogin')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model('surveys')

module.exports = app =>{
    app.get('/api/surveys',requireLogin, async (req,res) =>{
        const surveys = await Survey
            .find({_user:req.user.id})
            .select({recipients:0})
        res.send(surveys)
    })
    app.get('/api/surveys/:surveyId/:choice',(req,res)=> res.send("thanks for voting!"))
    app.post('/api/surveys',requireLogin, requireCredits, async (req,res)=>{
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(',').map(email =>  ({email:email.trim()})),
            _user:req.user.id,
            dateSent:Date.now()
        })
        
        const mailer = new Mailer(survey,surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user =  await req.user.save();

            res.send(user)
          } catch (e) {
            res.status(422).send(err)
            console.log(e);
          }
    })
    app.post('/api/surveys/webhooks',(req,res) =>{
        const p = new Path('/api/surveys/:surveyId/:choice')

            _.chain(req.body)
            .map(({email,url}) =>{
                const match = p.test(new URL(url).pathname);
                if(match){
                    const {surveyId,choice} = match;
                    return {email:email, surveyId:surveyId, choice:choice}
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({surveyId,email, choice}) => {
                Survey.updateOne({
                    _id:surveyId,
                    recipients:{
                        $elemMatch:{email:email,responded:false}
                        }
                    },
                    {   $inc:{[choice]:1},
                        $set:{'recipients.$.responded':true},
                        lastResponded: new Date()
                    }).exec()
                })
            .value();

            res.send({})
    })
}