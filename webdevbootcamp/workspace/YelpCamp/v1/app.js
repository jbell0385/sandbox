var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User    = require('./models/user'),
    seedDB      = require("./seeds");

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://jbell0385:Iatprata1)m@sandbox-shard-00-00-hygvs.mongodb.net:27017,sandbox-shard-00-01-hygvs.mongodb.net:27017,sandbox-shard-00-02-hygvs.mongodb.net:27017/test?ssl=true&replicaSet=sandbox-shard-0&authSource=admin");
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',"ejs");
app.use(express.static(__dirname + "/public"));

//Seed Database
// seedDB();

//Passport Configuration
app.use(require('express-session')({
    secret: 'Secret for the session!',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Check for the user
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})