

const express =require("express");
const productRoute=express.Router();
let Product =require("./Product.model");
const multer= require("multer");

//Save Product
productRoute.route("/saveproduct").post((req, res) => {
    let product = new Product(req.body);
    console.log(product);
    product.save().then(product=>{
        res.send("product added succesfully");
        res.end();
    })
    .catch((err)=>{
        res.send (err);
        res.end();
    })
});

//get product all
productRoute.route("/showproduct").get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err=>{
        res.status(400).send("data not found something went wrong");
    });
})


//get product all
productRoute.route("/showproductstatus/:pid").get(function(req,res){
    Product.findOne({"pid":req.params.pid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err=>{
        res.status(400).send("data not found something went wrong");
    });
})


//get product count for id
productRoute.route("/getmaxpid").get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err=>{
        res.status(400).send("data not found something went wrong");
    })
})
;

//save product image
const stv = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "F:/React/Project/Backend/Severapp/Admin/Product/ProductImages"); // Ensure the folder exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadv = multer({ storage: stv });

productRoute.post("/saveproductimage", uploadv.single("file"), (req, res) => {
    res.send("Upload successfully");
    res.end();
});


//get product image
    productRoute.route("/getproductimage/:ppicname").get(function(req,res){
        res.sendFile("F:/React/Project/Backend/Severapp/Admin/Product/ProductImages/"+req.params.ppicname)
        })

    //get product by vendor
    productRoute.route("/showproductbyvendor/:vid").get(function(req,res){
        Product.find({"vid":req.params.vid}).then(product=>{
            // console.log(product);
            res.send(product);
            res.end();
        })
        .catch(err=>{
            res.status(400).send("data not found something went wrong");
        });
    })
    

//get product by category
productRoute.route("/showproductbycatgid/:pcatgid").get(function(req,res){
    Product.find({"pcatgid":req.params.pcatgid}).then(product=>{
        // console.log(product);
        res.send(product);
        res.end();
    })
    .catch(err=>{
        res.send(err);
        res.end()
    });
})



//update status
productRoute.route("/updateproductstatus/:pid/:status").put((req,res)=>{
    Product.updateOne({"status":req.params.status}).then(state=>{
        res.send("product status updated successfully");
        res.end();
    })
    .catch(err=>{
        res.send(err);
        res.end()
    });
})

module.exports = productRoute;
