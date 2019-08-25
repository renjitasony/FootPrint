var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var adminrouter = require('./route/adminrouter');
var userrouter = require('./route/userrouter');
var product = require('./model/product');
var url = "mongodb+srv://sonyrenjita:mangoHONET@cluster0-sbret.mongodb.net/FootPrint?retryWrites=true&w=majority"

mongoose.connect(url,{useNewUrlParser:true},(err)=>{    
    if(err) throw err;
    else{
        console.log("db connected");
    }
});
const app = express();

app.set("view engine","ejs");
app.set("views","./src/views");
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyparser.urlencoded({extended:true}));
app.use("/admin",adminrouter);
app.use('/user',userrouter);

app.listen(process.env.PORT || 7634, (req,res)=>{
    console.log("Server started at 7634");
});

app.get("/",function(req,res){
    res.render("login");
});

app.get("/viewimage/:image",function(req,res){    
    res.sendFile(__dirname+"/public/uploads/"+req.params.image);
});
