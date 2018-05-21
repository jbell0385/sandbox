var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/about', (req,res)=>{
    res.render('about');
})

app.listen(process.env.PORT || 8888, process.env.IP, ()=>{
    console.log("Server Started");
});