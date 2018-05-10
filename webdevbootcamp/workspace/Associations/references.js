var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user")

//POST - title, content
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// })
// var Post = mongoose.model("Post", postSchema);





// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })

Post.create({
    title: "How to cook the best burger Pt. 5",
    content: "Cook it welllll done"
}, (err,post)=>{
    if(err){
        console.log(err);
    }else{
        User.findOne({email:"bob@gmail.com"},(err,foundUser)=>{
            if(err){
                console.log(err)
            }else{
                foundUser.posts.push(post);
                foundUser.save((err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data);
                    }
                })
            }
        })
    }
})


// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })
