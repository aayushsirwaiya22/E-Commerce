
const express = require ("express");
const productCatgRoute =express.Router();
var ProductCatg = require("./productcatg.model");

// save Product category
productCatgRoute.route("/save").post((req,res)=>{
    const productcatg = new ProductCatg(req.body);
    productcatg.save().then(()=>{
        res.send("Data Saved");
        res.end();
    }).catch((err)=>{
        res.send((err))
        res.end();

    });
})


//show all product category

productCatgRoute.route('/show').get((req,res)=>{
    ProductCatg.find().then((productcatg)=>{
        res.send(productcatg);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();

    });
});

module.exports=productCatgRoute;


