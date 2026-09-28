//execute below command in terminal
//npm install nodemailer

const nodemailer =require("nodemailer");
const express =require("express");
const emailrouter =express.Router();
emailrouter.post("/sendemails/:mailto/:subject/:message", async (req,res)=>{
    try{
        const transporter =nodemailer.createTransport({
            service:"gmail",
            port:465,
            secure:true,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        console.log(req.params.mailto);
        const mailoptions ={
            from :process.env.EMAIL_USER,
            to:req.params.mailto,
            subject:req.params.subject,
            text:req.params.message
        };
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.error("Error in sending email" , err);
                return res.status(500).json({error: "Failed to send email"});
            }
            else{
                console.log("Email sent ", info.response);
                return res.status(200).json({response:"Mail sent successfully"});
            }
        });

    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})
module.exports = emailrouter;
