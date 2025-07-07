var mongoose=require("mongoose");
var Schema =mongoose.Schema;
var ProductCatg= new Schema({
    PCatgId:{type:String},
    PCatgName:{type:String},
},{collection:"ProductCatg"});
 module.exports = mongoose.model("ProductCatg",ProductCatg);