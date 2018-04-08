var express = require("express");

var app = express();

app.get("/",(req,res)=>{
    res.send("<h1>Hi there, welcome to my assignment!</h1>");
})

app.get("/speak/:animal",(req,res)=>{
    var animals = {
        pig:"Oink",
        cow:"Moo",
        dog:"Woof Woof!"
    }
    var animal = req.params.animal.toLowerCase();
    if(!animals[animal]){
        res.send(`<h1>Animal not found.</h1>`);
    }else{
        var sound = animals[animal];
        res.send(`<h1>The ${animal} says "${sound}".</h1>`);
    }
})

app.get("/repeat/:phrase/:count",(req,res)=>{
    var phrase = req.params.phrase;
    var count = Number(req.params.count);
    var finalPhrase = "";
    
    for(var i=0; i<count;i++){
        finalPhrase+=phrase + " ";
    }
    
    res.send(`${finalPhrase}`);
    
})

app.get("*",(req,res)=>{
    res.send("sorry page not found");
})

app.listen(process.env.PORT, process.env.IP, function (){
    console.log("Server has started");
});