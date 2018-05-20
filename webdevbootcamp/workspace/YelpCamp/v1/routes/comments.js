var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//Comments new
router.get("/new", middleware.isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:foundCampground});
        }
    })  
})

//Comments Create
router.post("/", middleware.isLoggedIn, (req,res)=>{
    var newComment = req.body.comment;
    Comment.create(newComment, (err,newComment)=>{
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
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
                    req.flash('success','successfully added comment');
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
})

//Show edit comment page
router.get("/:cid/edit", middleware.isCommentOwner, (req,res)=>{
    Comment.findById(req.params.cid,(err,comment)=>{
        if(err){
            console.log(err);
            res.redirect(`/campgrounds/${req.params.id}`);
        }else{
            res.render("comments/edit",{campground:req.params.id, comment:comment});
        }
    })  
})

//Process edit comment page
router.put("/:cid", middleware.isCommentOwner, (req,res)=>{
    var newComment = req.body.comment;
    Comment.findByIdAndUpdate(req.params.cid, newComment, (err,comment)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })  
})

//Process comment delete page
router.delete("/:cid", middleware.isCommentOwner, (req,res)=>{
    var newComment = req.body.comment;
    Comment.findByIdAndRemove(req.params.cid, (err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success', "COmment deleted");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })  
})



module.exports = router;