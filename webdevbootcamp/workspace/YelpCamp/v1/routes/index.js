var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


//Root route
router.get("/",(req,res)=>{
    res.render("landing");
})

// ====================
// AUTH ROUTES
// ====================

//show register form route
router.get('/register', (req,res)=>{
    res.render('register');
})

//Create new user route
router.post('/register', (req,res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }else{
            passport.authenticate('local')(req,res, ()=>{
                res.redirect('/campgrounds');
            })
        }
    })
})

//Show login form
router.get('/login', (req,res)=>{
    res.render('login');
})

//Log user in route
router.post('/login',passport.authenticate('local', 
    {
        successRedirect:'/campgrounds',
        failureRedirect:'/login'
    }), (req,res)=>{
});

//logout route
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/campgrounds');
})

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;