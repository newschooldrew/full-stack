const mongoose = require('mongoose')
const {Schema} = mongoose;

const surveySchema = new Schema({
    tite:String,
    body:String,
    subject:String,
    recipients:[String]
})

mongoose.model('surveys',surveySchema)