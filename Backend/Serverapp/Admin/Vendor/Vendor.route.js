const express = require("express");
const path = require("path");
const { hashPassword, verifyPassword } = require("../../utils/passwords");
const VendorRoute = express.Router();
const bodyparser =require("body-parser");
var Vendor=require("./Vendor.model");
var fs=require("fs");
const multer =require("multer");
// const { fileURLToPath } = require("url");

//Vendor Registration code 
VendorRoute.route("/register").post((req,res)=>{
    if (req.body.VUserPass) req.body.VUserPass = hashPassword(req.body.VUserPass);
    var vendor = new Vendor(req.body);
    vendor.save().then(()=>{
       if(Vendor!=null){
        res.send("Registration Succesful");
       }
       else{
        res.send("Registration Failed");
       }
    }).catch((err)=>{
        res.status(400).send("Registration Failed");
    });
})

//Login
VendorRoute.route("/login").post((req,res)=>{
    var id=req.body.vuid;
    var pass=req.body.vupass;
    console.log("userid="+id+"password"+pass);
    Vendor.findOne({"VUserId":id}).then((vendor)=>{
        if(!vendor){
            res.send({});
            res.end();
            return;
        }
        const check = verifyPassword(pass, vendor.VUserPass);
        if(!check.ok){
            res.send({});
            res.end();
            return;
        }
        if(check.legacy){
            const newHash = hashPassword(pass);
            Vendor.updateOne({ _id: vendor._id }, { VUserPass: newHash }).catch(()=>{});
        }
        vendor.VUserPass = undefined;
        res.send(vendor);
        res.end();

    })
    .catch((err)=>{
        res.send("Something went Wrong");
        res.end();
    })
});

//Get Image
VendorRoute.route("/getimage/:vpicname").get((req,res)=>{
    res.sendFile(path.join(__dirname, "VendorImages", req.params.vpicname))
});

//image save
const st = multer.diskStorage({
   destination:(req,file,cb)=>{
    cb(null, path.join(__dirname, "VendorImages"))
   },
   filename:(req,file,cb)=>{
    cb(null,file.originalname)
   },
})
const upload =multer({storage:st});

VendorRoute.post('/savevendorimage',upload.single('file'),(req,res)=>{
    res.send("ok")
})

//get vendor for count
VendorRoute.route("/getvendorcount").get((req,res)=>{
    Vendor.find()
    .then(vendor=>{
        res.send(vendor);
        res.end;
    })
    .catch((err)=>{
        res.send("Somethong went Wrong");
        res.end();
    })
})

//enable disable vendor by admin
VendorRoute.route('/vendormanage/:vid/:status').put((req,res)=>{
    Vendor.updateOne({"Vid":req.params.vid},{"Status":req.params.status})
    .then(()=>{
        res.send("Vendor Status updated succesfully")
        res.end();
    })
    .catch((err)=>{
        res.send(err);
        res.end();
    })
})
module.exports=VendorRoute;

