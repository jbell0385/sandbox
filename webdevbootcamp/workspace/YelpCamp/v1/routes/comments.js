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

//Show edit comment page
router.get("/:cid/edit", isCommentOwner, (req,res)=>{
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
router.put("/:cid", isCommentOwner, (req,res)=>{
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
router.delete("/:cid", isCommentOwner, (req,res)=>{
    var newComment = req.body.comment;
    Comment.findByIdAndRemove(req.params.cid, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect(`/campgrounds/${req.params.id}`);
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

function isCommentOwner(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, (err,comment)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                if(req.user && comment.author.id.equals(req.user.id)){
                    return next();
                }else{
                    res.redirect('back');
                }
            }
        })
    }else{
        res.redirect('/login');
    }
}

module.exports = router;