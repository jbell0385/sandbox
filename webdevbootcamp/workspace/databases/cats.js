var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app");

var catSchema = new mongoose.Schema({
    name:String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var George = new Cat({
//     name:"Mrs. Norris",
//     age:8,
//     temperament:"kind"
// })

// George.save((err,cat)=>{
//     if(err){
//         console.log("Something went wrong");
//     }else{
//         console.log("We just saved a cat to the DB:");
//         console.log(cat);
//     }
// });

//adding a new cat to DB

Cat.create({
    name:"Snow White",
    age: 12,
    temperament: "Nice"
}, (err,cat)=>{
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
})

//Retrieve all cats from DB and console.log each one

Cat.find({},(err, cats)=>{
    if(err){
        console.log("Oh no error!");
        console.log(err);
    }else{
        console.log("all the cats...")
        console.log(cats);
    }
})