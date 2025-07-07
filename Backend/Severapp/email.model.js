const nodemailer = require("nodemailer");
const express = require("express");
const emailrouter = express.Router();

emailrouter.post("/sendemails/:mailto", async (req, res) => {
  try {
    res.status(200).json({ response: "Mail Sent" });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user:"bsmernwala@gmail.com",
        pass:"necc umnw wnpi bmzy",
      },
    });
    console.log(req.params.mailto);
    const mailOptions = {
      from:"aayushsirwaiya22@gmail.com",
      to: req.params.mailto,
      subject: "Registration Success",
      text: "Your Registeration iss Successfully Done Wait For Admin Side Activation",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error Sending email" + error);
      } else {
        console.log("Email Sent", info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = emailrouter;