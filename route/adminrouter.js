var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

//var url = "mongodb+srv://renjitasony:mangoHONET@cluster0-y18tu.mongodb.net/footprint?retryWrites=true&w=majority";
 var url = "mongodb://localhost/lfootprint";
const router = express.Router();
var product = require('../model/product');
var multer = require('multer');

router.use(bodyparser.urlencoded({extended:true}));
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'/../public/uploads/'));          
    },
    filename:function(req,file,cb){
        // let fileExtension = file.mimetype.split("/").pop();        
        cb(null,"image_"+req.body.productid+".jpg");
    },
    onFileUploadStart:function(file){
        console.log("starting"+file.filename);
    },
    onFileUploadComplete:function(file){
        console.log("completed"+file.filename);
    }
});
 var upload = multer({storage:storage});
//var upload = multer({dest:path.join(__dirname,'/public/uploads')});

mongoose.connect(url,{useNewUrlParser:true},(err)=>{
    if(err) throw err;
    else{
        console.log("db connected");
    }
});
var pdct_array = [
    {
        "ptitle":"Wild West Hoodie",
        "pimage":"data:image/jpeg;base64,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",
        "pprice":330,
        "pmarket":0,
        "plist":"A",
        "ptype":"men",
        "deleted":"no"
    },
    {
        "ptitle":"Running Sports Shoes Men",
        "pimage":"https://image.made-in-china.com/202f0j00wUMfWpVdZukl/Alibaba-Online-Shopping-New-Running-Sport-Shoes-Men.jpg",
        "pprice":330,
        "pmarket":0,
        "plist":"A",
        "ptype":"men",
        "deleted":"no"
    },
    {
        "ptitle":"Blade Warrior Sports Shoes for Men",
        "pimage":"https://img1.cfcdn.club/22/73/22443325a5315c79b535c48cdfdf5373_350x350.jpg",
        "pprice":1825,
        "pmarket":0,
        "plist":"A",
        "ptype":"men",
        "deleted":"no"
    },
    {
        "ptitle":"Women's casual sports shoes",
        "pimage":"https://img1.cfcdn.club/62/39/627cc5492011d03b358146a845fe4039_800x800.jpg",
        "pprice":993,
        "pmarket":0,
        "plist":"A",
        "ptype":"women",
        "deleted":"no"
    }
];

module.exports = router;

router.get("/newentries",function(req,res){
    res.render("newentries",{
        products:pdct_array
    });
});
router.get("/",function(req,res){
    product.find({product_list:"A"},(err,result)=>{
        if(err) throw err;
        else{
            res.render("admin",{pdtlist:result});
        }
    });
});
router.post("/addnewpdct",upload.single('productimage'),function(req,res){
    console.log("vanne");
    var pct = new product();
    var pdctId = req.body.productid;
    pct.product_id = pdctId;
    pct.product_title = req.body.productname;
    pct.product_image = "image_"+pdctId+".jpg";
    pct.product_price = req.body.productprice;
    pct.product_type = req.body.producttype;
    pct.product_size = req.body.productsize;
    pct.save((err)=>{
        if(err) throw err;
        else{
            console.log("Added product #"+req.body.productid);
            res.redirect("/admin#products-section");
        }
    });    
   });
   router.get("/view/:id",function(req,res){
    product.findOne({product_id:req.params.id},(err,result)=>{
        if(err) throw err;
        else{
            console.log(result);
            res.render("newentries",{product:result});
        }
    });
    router.get("/delete/:id",function(req,res){
        product.deleteOne({product_id:req.params.id},(err)=>{
            if(err) throw err;
            else{
                console.log("deleted");
                res.redirect("/admin");
            }
        })
    })
   });