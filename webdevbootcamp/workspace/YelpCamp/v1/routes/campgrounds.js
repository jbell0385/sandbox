
var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//Display all campgrounds route
router.get("/", (req,res)=>{
    //Get all Campgrounds from db
    Campground.find({},(err,campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
})

//Create new campground route
router.post("/", (req,res)=>{
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

//show new campground form
router.get("/new",(req,res)=>{
    res.render("campgrounds/new");
})

//Show Route
router.get("/:id", (req,res)=>{
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

module.exports = router;