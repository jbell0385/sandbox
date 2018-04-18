var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

//App config
app.use(express.static("public"));
app.use(express.static("node_modules/semantic-ui/dist"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Mongoose/model config
var mongoDB = 'mongodb://localhost/RESTfulBlogApp';
mongoose.connect(mongoDB);
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title:"Test Blog",
//     image: "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg",
//     body: "This is a test blog creation."
// })

//Restful routes
app.get("/",(req,res)=>{
    res.redirect("/blogs")
})

//Index Route
app.get("/blogs", (req,res)=>{
    Blog.find({}, (err,blogs)=>{
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs:blogs});
        }
    })
})

//New Route
app.get("/blogs/new", (req,res)=>{
    res.render("new");
})

//Create Route
app.post("/blogs", (req,res)=>{
    Blog.create(req.body.blog, (err, newBlog)=>{
        if(err){
            console.log(err);
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
})

//Show Route
app.get("/blogs/:id", (req,res)=>{
    Blog.findById(req.params.id, (err,foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    })
})

app.listen(8888, function (){
    console.log("Server is running");
})
