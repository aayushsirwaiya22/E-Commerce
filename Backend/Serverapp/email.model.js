const nodemailer = require("nodemailer");
const express = require("express");
const emailrouter = express.Router();

emailrouter.post("/sendemails/:mailto", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log(req.params.mailto);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.params.mailto,
      subject: "Registration Success",
      text: "Your Registeration iss Successfully Done Wait For Admin Side Activation",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error Sending email" + error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email Sent", info.response);
        return res.status(200).json({ response: "Mail Sent" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = emailrouter;