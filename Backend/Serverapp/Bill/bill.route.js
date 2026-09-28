const express = require("express");
const billRoute = express.Router();
let Bill = require("./bill.model");

// save Bill 

billRoute.route("/billsave").post((req,res)=>{
    let bill = new Bill(req.body);
   bill.save().then(bill=>{
    res.send({"bill":"bill added Successfully"});
   }).catch(err=>{
    res.send(err);
   });
});

// show all bill by customer id 

billRoute.route("/billshow/:cid").get((req,res)=>{
    Bill.find({"cid":req.params.cid}).then(bill=>{
        res.send(bill);
        res.end();
    }).catch((err)=>{
    res.send(err);
    res.end();
   })
})

billRoute.route("/billshowbillids/:cid").get((req,res)=>{
    Bill.distinct("billid",{"cid":req.params.cid})
    .then(bill=>{
        res.send(bill);
        res.end();
    }).catch(err=>{res.send(err);
        res.end();
    });
});

// get Id of last Entered bill to generate id for next bill

billRoute.route("/getbillid").get((req,res)=>{
    Bill.find().sort({"billid":-1}).limit(1).then(bill=>{
        console.log(bill);
        res.send(bill);
        res.end()
    }).catch(err =>{

        res.send(err);
        res.end();
    });
});

// get bill details by billid 
billRoute.route("/showbillbyid/:billid").get((req,res)=>{
    Bill.find({"billid":req.params.billid})
    .then(bill =>{
        res.send(bill);
        res.end();
    }).catch(err =>{
        res.send(err);
        res.end();
    });
});

//update bill status  if succesfulyy set
billRoute.route("/billstatusupdated/:billid").put((req,res)=>{
    Bill.find({$and:[{"cid":req.params.cid},{"status":"success"}]})
    .then(bill=>{
        res.send(bill);
        res.end()
    })
    .catch((err)=>{
        res.send(err)
        res.end();
    })
})
// show all  bill 
billRoute.route("/billshow").get((req,res)=>{
    Bill.find()
    .then(bill =>{
        res.send(bill);
        res.end();
    
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});
module.exports = billRoute