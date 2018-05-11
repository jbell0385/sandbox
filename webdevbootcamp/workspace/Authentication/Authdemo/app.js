var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    User                  = require('./models/user'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret: 'Rusty is the best and custest dog in the world',
    resave: false,
    saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended:true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//========================================
//Routes
//========================================

app.get('/', (req,res)=>{
    res.render('home');
})

app.get('/secret',isLoggedIn, (req,res)=>{
    res.render('secret');
})

//Auth Routes

//show signup form
app.get('/register', (req,res)=>{
    res.render('register');
})

app.post('/register', (req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}),password,(err, user)=>{
        if(err){
            console.log(err);
            res.render('register');
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect("/secret");
            })
        }
    })
});

//login routes
app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,(req,res)=>{
    req.session.save(()=>{
        res.redirect('/secret')
    })
})

app.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})