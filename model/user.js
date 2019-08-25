var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name:{type:String,required:true}, 
    mob:{type:Number,required:true}, 
    username:{type:String,required:true}, 
    role:{type:String,required:true,default:"client"}, 
    mail:String,
    password:{type:String,required:true}    
});

var umodel = mongoose.model("user",userSchema,"user");
module.exports = umodel;