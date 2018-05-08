var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Campground = require("./models/campground"),
    seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',"ejs");

//Seed Database
//seedDB();

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
app.get("/campgrounds/:id/comments/new",(req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground)=>{
        res.render("comments/new",{campground:foundCampground});
    })
})

app.post("/campgrounds/:id/comments",(req,res)=>{
    var commentText = req.body.commentText;
    var author = req.body.author;
    console.log(commentText, author);
    res.redirect(`/campgrounds/${req.params.id}`);
})

app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})