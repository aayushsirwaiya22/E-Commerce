const express =require("express");
const multer =require("multer")
const customerRoute=express.Router();
const bodyparser =require("body-parser");
const Customer=require("./Customer.model");
var fs =require("fs")
const nodemailer =require("nodemailer");

function sendGmail(mailto){
    console.log("mail:-"+mailto);
    res.status(200).json({response: "Mail sent"});
    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass:"necc umnw wnpi bmzy "
        }
    })

    const mailOptions ={
            from:"aayushsirwaiya22@gmail.com",
            to:mailto,
            subject:"Registration sucess",
            text:"Dear Customer , Your Regisrtation is succesfully done but it is in"
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.error("Error sending email",error);
            }
            else{
                console.log("Email sent ", info.response);
            }
        })
    }
    //customer registration code
    customerRoute.route("/register").post((req,res)=>{
        var customer=new Customer(req.body);
        customer.save().then(customer=>{
            if(customer!=null){
                // sendGmail(req.body.CEmail);
                res.send("Registration successfully");
                res.end()
            }
            else{
                res.send("Registration Failed");
                res.end()
            }
        }).catch((err)=>{
            res.send(err);
            res.end()
        })
    });
    //login

    customerRoute.route("/login").post((req,res)=>{
        var id=req.body.CUserId;
        var pass=req.body.CUserPass;
        Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]})
        .then(customer=>{
            res.send(customer);
            res.end();
        })
        .catch((err)=>{
            res.send("something went wrong");
            res.end();
        })
    })

    
    //get  image
        customerRoute.route("/getimage/:cpicname").get((req,res)=>{
            res.sendFile("F:/React/Project/Backend/Severapp/Admin/customer/CustomerImages/"+req.params.cpicname)
            })

    //save image
    const st = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,"F:/React/Project/Backend/Severapp/Admin/customer/CustomerImages/"); // Ensure the folder exists
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    
    const upload = multer({ storage: st });
    
    customerRoute.post("/savecustomerimage", upload.single("file"), (req, res) => {
        // res.json({})
        res.send("Upload successfully");
        res.end();
    });

    //get cosutomer for count
    customerRoute.route("/getcustomercount").get((req,res)=>{
        Customer.find().then(customer=>{
            // console.log(customer);
            res.send(customer);
            res.end();
        })
        .catch(err=>{
            res.send("data not found something went wrong");
        })
    })

    //get customer details by id
    customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
        var id=req.body.cid;
        Customer.findOne({"cid":id})
        .then(customer=>{
            // console.log(customer);
            res.send(customer);
            res.end();
        })
        .catch((err)=>{
            res.send("something went wrong");
            res.end();
        })
    })

//get customer list
customerRoute.route("/getcustomerlist").get((req,res)=>{
    var id=req.body.cid;
    Customer.find()
    .then(customer=>{
        // console.log(customer);
        res.send(customer);
        res.end();
    })
    .catch((err)=>{
        res.send("something went wrong");
        res.end();
    })
})

//enable disable customer by admin
customerRoute.route("/customermanage/:cid/:status").put((req,res)=>{
    Customer.updateOne({"cid":req.params.cid},{"status":req.params.status}).then(vendor=>{
        res.send("Customer status updated successfully");
        res.end();
    })
    .catch(err=>{
        res.send(err);
        res.end()
    });
})    

module.exports=customerRoute;