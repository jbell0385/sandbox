var express = require("express");

var app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('home');
})

app.get('/secret', (req,res)=>{
    res.render('secret');
})

app.listen(8888, function(){
    console.log("Yelp Camp Server has started");
})