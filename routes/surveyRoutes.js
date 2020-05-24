const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireLogin')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model('surveys')

module.exports = app =>{
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
          } catch (e) {
            console.log(e);
          }
    })
}