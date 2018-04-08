var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/results", (req, res)=>{
    var searchTerm = req.query.search;
    var url = `http://omdbapi.com/?s=${searchTerm}&apikey=2909c483`
    request(url, (error, response, body)=>{
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            res.render("results",{data:data});
        }
    })
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!");
});