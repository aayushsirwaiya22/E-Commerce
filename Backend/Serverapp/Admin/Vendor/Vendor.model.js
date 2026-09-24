var mongoose=require("mongoose");
var Schema =mongoose.Schema;
var Vendor= new Schema({
    VUserId:{type:String},
    VUserPass:{type:String},
    VendorName:{type:String},
    VAddress:{type:String},
    VContact:{type:Number},
    VEmail:{type:String},
    VPicName:{type:String},
    Vid:{type:Number},
    Status:{type:String}
},{collection:"Vendor"});
 module.exports = mongoose.model("vendor",Vendor);