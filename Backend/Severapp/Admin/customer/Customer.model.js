var mongoose= require("mongoose");
var Schema=mongoose.Schema;
var Customer=new Schema({
    CUserId:{type:String},
    CUserPass:{type:String},
    CustomerName:{type:String},
    StId:{type:Number},
    CtId:{type:Number},
    CAddress:{type:String},
    CContact:{type:Number},
    CEmail:{type:String},
    CPicName:{type:String},
    Cid:{type:Number},
    Status:{type:String},
},{collection:"Customer"});
module.exports=mongoose.model("Customer",Customer)