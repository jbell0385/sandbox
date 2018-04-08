var express = require("express");

var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
   res.send("Hi there! How are you?"); 
});

// "/bye" => Goodbye!
app.get("/bye", function(req,res){
    res.send("Goodbye!");
})

// "/dog" => "MEOW"
app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog")
    res.send("RUFF RUFF!");
})

app.get("/r/:subredditName/comments/:id/:title", function(req,res){
    var subreddit = req.params.subredditName;
    var title = req.params.title;
    res.send(`Welcome to ${subreddit.toUpperCase()} Subreddit. Story: ${title}`);
})

app.get("*",function(req,res){
    res.send("You are a star!")
})


//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function (){
    console.log("Server has started");
});