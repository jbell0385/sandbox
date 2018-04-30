var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})
var Post = mongoose.model("Post", postSchema);


//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
})

var User = mongoose.model("User", userSchema);






// var newUser = new User({
//     email: "charlieBrown@gmail.com",
//     name: "Charlie Brown"
// });

// newUser.posts.push({
//     title:"How to brew potion",
//     content: "just kidding go to postions class"
// })

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })

// var newPost = new Post({
//     title: "My first post",
//     content: "The content of my first post"
// })

// newPost.save((err, post)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// })

User.findOne({name:"Charlie Brown"},(err,user)=>{
    if(err){
        console.log(err);
    }else{
        user.posts.push({
            title: "3 things I really hate",
            content: "Voldemort. Voldemort. Voldemort."
        });
        user.save((err,user)=>{
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        })
    }
})