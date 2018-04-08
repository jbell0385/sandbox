var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//Routes
app.get("/", (req,res)=>{
    res.render("home");
})

app.get("/fallinlovewith/:thing", (req,res)=>{
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
})

app.get("/posts", (req,res)=>{
    var posts = [
        {title:"post 1", author: "susy"},
        {title:"post 2", author: "Jack"},
        {title:"post 3", author: "Jim"}
    ];
    
    res.render("posts",{posts:posts});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
})