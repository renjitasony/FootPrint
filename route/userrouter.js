var express = require('express');


const router = express.Router();
module.exports = router;

var user = require('../model/user');

function authenticate(uname,pwd){
    
    user.findOne({username:uname,password:pwd},(err,result)=>{
        if(err) throw err;
        else{
            console.log("authenticate");
            if(result != null){
                return result.role;
            }
            return null;
        }
    });
}

router.post("/adminoruser",function(req,res){
    
    user.findOne({username:req.body.uname,password:req.body.upwd},(err,result)=>{
        if(err) throw err;
        else{
            console.log("authenticate");
            if(result == null){
                res.redirect("/")
            }else if(result.role == 'admin'){
                res.redirect("/admin");
            }else{
                res.render("index");
            }
                
        }    
    });
   
   
});
router.get("/signup",(req,res)=>{
    res.render("signup");
});
router.post("/reguser",(req,res)=>{
    let upwd = req.body.upwd;
    let cpwd = req.body.cpwd;
   
    if(upwd != cpwd){
       console.log('wow');
    }
    
    var u1 = new user();
    u1.name = req.body.uname;
    u1.mob = req.body.umob;
    u1.username = req.body.usname;
    u1.role = req.body.urole;
    u1.mail = req.body.umail;
    u1.password = req.body.upwd;
    u1.save((err)=>{
        if(err) throw err;
        else{
            console.log("user added");
            res.redirect("/");
        }
    })
    
});

