//execute below command in terminal
//npm install nodemailer

const nodemailer =require("nodemailer");
const express =require("express");
const emailrouter =express.Router();
emailrouter.post("/sendemails/:mailto/:subject/:message", async (req,res)=>{
    try{
        res.status(200).json({response:"Mail sent" })

        const transporter =nodemailer.createTransport({
            service:"gmail",
            port:465,
            secure:true,
            auth:{
                user: "bsmernwala@gmail.com",
                pass:"necc umnw wnpi bmzy",
            }
        });
        console.log(req.params.mailto);
        const mailoptions ={
            from :"bsmernwala@gmail.com",
            to:req.params.mailto,
            subject:req.params.subject,
            text:req.params.message
        };
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.error("Error in sending email" , err);
                res.status(500).json({error: "Failed to send email"});
            }
            else{
                console.log("Email sent ", info.response);
                res.status(200).json({response:"Mail sent successfully"});  // ✅ Ye ab sahi jagah pe hai
            }
        });
        
    }
    catch(error){
        res.status(500).json({error});
    }
})
module.exports = emailrouter;
// const nodemailer = require("nodemailer");
// const express = require("express");
// const emailrouter = express.Router();

// emailrouter.post("/sendemails/:mailto/:subject/:message", async (req, res) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "bsmernwala@gmail.com",
//                 pass: "necc umnw wnpi bmzy",
//             }
//         });

//         console.log(req.params.mailto);

//         const mailoptions = {
//             from: "bsmernwala@gmail.com",
//             to: req.params.mailto,
//             subject: req.params.subject,
//             text: req.params.message
//         };

//         transporter.sendMail(mailoptions, (err, info) => {
//             if (err) {
//                 console.error("Error in sending email", err);
//                 return res.status(500).json({ error: "Failed to send email" });  // ✅ return lagaya
//             } else {
//                 console.log("Email sent ", info.response);
//                 return res.status(200).json({ response: "Mail sent successfully" }); // ✅ return lagaya
//             }
//         });

//     } catch (error) {
//         return res.status(500).json({ error }); // ✅ return yahan bhi
//     }
// });

// module.exports = emailrouter;
