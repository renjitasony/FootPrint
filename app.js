var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var adminrouter = require('./route/adminrouter');

function authenticate(){
    console.log("authenticated");
}

const app = express();

app.set("view engine","ejs");
app.set("views","./src/views");
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyparser.urlencoded({extended:true}));
app.use("/admin",adminrouter);

app.listen(7634,function(req,res){
    console.log("Server started at 7634");
});

app.get("/",function(req,res){
    res.render("login");
});
app.post("/adminoruser",function(req,res){
    authenticate();
    var uname = req.body.uname;
    if(uname.includes("@footprint.com")){
        res.render("admin");
    }else{
        res.render("index");
    }
});