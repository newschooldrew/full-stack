const express = require('express')
const passport = require('passport')
module.exports = app =>{

    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
        })
    )
    
    app.get('/auth/google/callback',passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/surveys')
        }
    );

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/')
    })

    app.get('/api/current_user',(req,res) =>{
        res.send(req.user)
    })

    ////////////////////////// FACEBOOK ////////////////////////

    app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' }));
  
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/surveys');
    });


}