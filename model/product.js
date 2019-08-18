var mongoose = require('mongoose');
var schema  = mongoose.Schema;
var schemaTypes = mongoose.Schema.Types;

var pdctschema = new schema({
    product_id:{type:String,required:true},
    product_title:{type:String,required:true},
    product_image:{type:String,required:true},
    product_price:{type:schemaTypes.Decimal128,default:0},
    product_list:{type:String,default:"A"},
    product_type:{type:String,default:"unisex"},
    product_size:schemaTypes.Decimal128
});

var pdctmodel = mongoose.model("product",pdctschema);
module.exports = pdctmodel;