const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
     },async (accessToken, refreshToken, profile,done)=>{
            const existingUser = await User.findOne({googleId:profile.id})
                    if(existingUser){
                        // 1. error is null
                        // 2. here is the user we found
                        console.log(existingUser)
                        done(null,existingUser);
                    } else{
                        const user = await new User({googleId:profile.id}).save()
                        done(null,user)
                    }
                }
            )
        )

        passport.use(new FacebookStrategy({
            clientID: '291124771037034',
            clientSecret: '28b8591fe22c658fc756e8f6243d6fc8',
            callbackURL: "/auth/facebook/callback"
          },async (accessToken, refreshToken, profile,done)=>{
            const existingUser = await User.findOne({facebookId:profile.id})
                    if(existingUser){
                        // 1. error is null
                        // 2. here is the user we found
                        console.log(existingUser)
                        done(null,existingUser);
                    } else{
                        const user = await new User({facebookId:profile.id}).save()
                        done(null,user)
                    }
                }
        ));