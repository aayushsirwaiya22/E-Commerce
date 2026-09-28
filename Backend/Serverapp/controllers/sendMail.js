const nodemailer =require ("nodemailer");

const sendMail = async(req,res)=>{
    let mail = await nodemailer.createTestAccount();

    //connect with smtp
    let transporter= await nodemailer.createTransport({
            service:"gmail",
            port:465,
            secure:true,
            auth:{
                user: "aayushsirwaiya964@gmail.com",
                pass:"vhot rsha axkf etoa",
            }
    })

    let mailoptions = await transporter.sendMail({
        from:"aayushsirwaiya964@gmail.com",
        to:"aayushsirwaiya22@gmail.com",
        subject:"node Js mail testing",
        text:"Hello this is a aayush"

    })
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error Sending email" + error);
    //   } else {
    //     console.log("Email Sent", info.response);
    //   }
    // });
    console.log("Message sent: %s", mailoptions.messageId);
  res.json(mailoptions);
};

module.exports = sendMail;
  

