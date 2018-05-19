
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
router.post("/",isLoggedIn, (req,res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name:name, image:image, description:description, author:author};
    Campground.create(newCampground,(err,campground)=>{
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
})

//show new campground form
router.get("/new",isLoggedIn,(req,res)=>{
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

//Edit Form Route
router.get("/:id/edit",checkCampgroundOwnership, (req,res)=>{

    //find the campgroudn with the provided ID
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+foundCampground._id); 
        }else{
            res.render("campgrounds/edit",{campground:foundCampground});
        } 
    });
})

//Update Route
router.put("/:id",checkCampgroundOwnership, (req,res)=>{
    //find the campgroudn with the provided ID
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            //render show template
            res.redirect("/campgrounds/"+foundCampground._id);
        }
    });
})

//Destroy campground route
router.delete('/:id',checkCampgroundOwnership, (req,res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect('/campgrounds/'+req.params.id);
        }else{
            res.redirect('/campgrounds');
        }
    })
})

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                res.redirect('back');
            }else{
                if(foundCampground.author.id !== undefined &&foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        });
    }else{
        res.redirect('/login');
    }
}

module.exports = router;