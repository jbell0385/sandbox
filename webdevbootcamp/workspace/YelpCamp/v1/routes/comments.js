var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

//Comments new
router.get("/new", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:foundCampground});
        }
    })  
})

//Comments Create
router.post("/", isLoggedIn, (req,res)=>{
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
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    //save comments in campground
                    foundCampground.comments.push(newComment);
                    foundCampground.save(err=>console.log(err));
                    console.log(newComment);
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
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

module.exports = router;