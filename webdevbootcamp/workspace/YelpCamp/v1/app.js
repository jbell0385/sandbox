var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',"ejs");

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

Campground.create({
    name:"Salmon Creek",
    image:"http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"
}, (err,campground)=>{
    if(err){
        console.log(err)
    }else{
        console.log("new campground...");
        console.log(campground);
    }
})


app.get("/",(req,res)=>{
    res.render("landing");
})

//Campground route.
app.get("/campgrounds", (req,res)=>{
    //Get all Campgrounds from db
    Campground.find({},(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            
        }
    })
    //res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds", (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
})

app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})