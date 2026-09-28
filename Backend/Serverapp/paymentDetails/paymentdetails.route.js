const express =require('express');
const paymentdetailsRoute=express.Router();
let PaymentDetails=require('./paymentdetails.model')

//save payment details
paymentdetailsRoute.route('/paymentdetailsave').post((req,res)=>{
   let paymentdetails =new PaymentDetails(req.body);
   
    paymentdetails.save().then(bill=>{
        res.send("payment detials saved sucessfully");
        res.end();
    })
    .catch(err=>{
        res.send(err);
        res.end();
    })

})

//get payment details
paymentdetailsRoute.route('/showpaymentdetails').get((req,res)=>{
    PaymentDetails.find().then(pd=>{
        res.send(pd);
        res.end()
    })
    .catch(err=>{
        res.send(err);
        res.end()
    })
})

//get payment details by bill id 
paymentdetailsRoute.route('/showpaymentdetailsbyid/:billid').get((req,res)=>{
    PaymentDetails.findOne({"billid":req.params.billid})
    .then(pd=>{
        res.send(pd);
        res.end()
    })
    .catch(err=>{
        res.send(err);
        res.end()
    })
});
module.exports=paymentdetailsRoute;
