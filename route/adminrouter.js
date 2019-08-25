var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');

//var url = "mongodb://localhost/lfootprint";

const router = express.Router();
var product = require('../model/product');
var multer = require('multer');

router.use(bodyparser.urlencoded({extended:true}));
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log("in destination");
        cb(null,path.join(__dirname,'/../public/uploads/'));          
    },
    filename:function(req,file,cb){
        // let fileExtension = file.mimetype.split("/").pop();        
        cb(null,"image_"+req.body.productid+".jpg");
    },    
});
 var upload = multer({storage:storage});
//var upload = multer({dest:path.join(__dirname,'/public/uploads')});

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
   router.post('/update',upload.single('editproductimage'),(req,res)=>{
       console.log(req.body.productname);
        product.updateOne({product_id:req.body.productid},
                          {$set:{product_title:req.body.productname,
                                 product_price:req.body.productprice,
                                 product_size:req.body.productsize,
                                 product_type:req.body.producttype
                                }
                           },
                           (err,result)=>{
                                if(err) throw err;
                                else{
                                    console.log("Updated");
                                    res.redirect("/admin#products-section");
                                }
                           }
                        );
   });
   router.get("/view/:id",function(req,res){
    product.findOne({product_id:req.params.id},(err,result)=>{
        if(err) throw err;
        else{
             res.render("newentries",{product:result});
        }
    });
   });  
    router.get("/delete/:id",function(req,res){
        product.deleteOne({product_id:req.params.id},(err)=>{
            if(err) throw err;
            else{
                console.log("deleted");
                res.redirect("/admin#products-section");
            }
        })
    });
