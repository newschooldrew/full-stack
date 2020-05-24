const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/User')
require('./models/Survey')
require('./services/passport')

mongoose.connect(keys.mongoUri)

const app = express();

app.use(bodyParser.json())

app.use(
    cookieSession({
        //how long cookie can exist in browser
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if(process.env.NODE_ENV === 'production'){
    // make sure express serves up prod assets
    app.use(express.static('client/build'))

    //  express will serve up the index.html file if it doesnt recognize the route
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// heroku sets up this env variable for us
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"))