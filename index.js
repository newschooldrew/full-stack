const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoUri)

const app = express();

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

// heroku sets up this env variable for us
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"))