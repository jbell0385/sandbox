var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User    = require('./models/user'),
    seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
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

//home path
app.get("/",(req,res)=>{
    res.render("landing");
})

//Campground route .
app.get("/campgrounds", (req,res)=>{
    //Get all Campgrounds from db
    Campground.find({},(err,campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
})

app.post("/campgrounds", (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description};
    Campground.create(newCampground,(err,campground)=>{
        if(err){
            console.log(err);
        }else{
            console.log(campground);
        }
    })
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new");
})

//Show Route
app.get("/campgrounds/:id", (req,res)=>{
    //find the campgroudn with the provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            //render show template
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
})

//Comment Routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:foundCampground});
        }
    })  
})

app.post("/campgrounds/:id/comments", isLoggedIn, (req,res)=>{
    var newComment = req.body.comment;
    Comment.create(newComment, (err,newComment)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds/:id/comments/new");
        }else{
            Campground.findById(req.params.id,(err,foundCampground)=>{
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds/:id/comments/new");
                }else{
                    foundCampground.comments.push(newComment);
                    foundCampground.save(err=>console.log(err));
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
})

// ====================
// AUTH ROUTES
// ====================

//show register form
app.get('/register', (req,res)=>{
    res.render('register');
})

app.post('/register', (req,res)=>{
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
app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/login',passport.authenticate('local', 
    {
        successRedirect:'/campgrounds',
        failureRedirect:'/login'
    }), (req,res)=>{
});

//logout route
app.get('/logout', (req,res)=>{
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


app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})