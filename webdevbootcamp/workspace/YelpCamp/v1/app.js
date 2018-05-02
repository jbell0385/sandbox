var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Campground = require("./models/campground")

mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',"ejs");



// Campground.create(
//     {
//         name:'Campground 2',
//         image: 'https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png',
//         description: "A great campground for RV's. Has picnic area with fire pit to host parties."
//     },(err,campground)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     }
// )

app.get("/",(req,res)=>{
    res.render("landing");
})

//Campground route.
app.get("/campgrounds", (req,res)=>{
    //Get all Campgrounds from db
    Campground.find({},(err,campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:campgrounds});
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
    res.render("new.ejs");
})

app.get("/campgrounds/:id", (req,res)=>{
    //find the campgroudn with the provided ID
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            //render show template
            res.render("show",{campground:foundCampground});
        }
    });
})

app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})