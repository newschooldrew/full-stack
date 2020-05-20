const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const monogoose = require('mongoose')
const keys = require('../config/keys')
const User = monogoose.model('users')

// for browser
// 1. user is what we pulled out of database below
passport.serializeUser((user,done)=>{
    // 1. error is null
    // 2. user.id is mongo assigned ID
        // do not need to reference oid._id
    done(null, user.id)
})

// for server
passport.deserializeUser((id,done)=>{
        User.findById(id)
            .then(user => {
                done(null,user)
            })
})

passport.use(new GoogleStrategy(
    {
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
     },(accessToken, refreshToken, profile,done)=>{
         console.log(profile)
            User.findOne({googleId:profile.id})
                .then(existingUser => {
                    if(existingUser){
                        // 1. error is null
                        // 2. here is the user we found
                        console.log(existingUser)
                        done(null,existingUser);
                    } else{
                        new User({googleId:profile.id})
                            .save()
                            .then(user => done(null,user))
                    }
                })
     })
)