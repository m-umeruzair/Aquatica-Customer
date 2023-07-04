const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds= 10
const nodemailer = require("nodemailer");

router.post('/verification' ,async(req,res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
          user: 'cs1912261@szabist.pk',
          pass: 'nwxoyqajszhklvzs', 
        },
      }); 
      var otp = Math.random();
      otp = otp * 1000000;
      otp = parseInt(otp);

      var to= await req.body.email


      var mailOptions = {
        to: to,
        subject: "OTP for account registration on Aquatica",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1> </n> <h3>Please do not share this otp with anyone"
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent!');
    });
    console.log(otp)
    res.status(200).send(JSON.stringify(otp))
})


router.post('/sign-up', async(req,res)=>{

    var hashedPassword;
    // console.log(req.body.password)
    await bcrypt.genSalt(saltRounds).then(salt=>{
       return bcrypt.hash(req.body.password, salt)}).then(hash=>{
            hashedPassword = hash
           
        });
    const user=new User({
        email:req.body.email,
        password:hashedPassword,
        phoneNumber:req.body.phoneNumber,
        address:req.body.address,
        fullName:req.body.fullName,
        longitude:req.body.longitude,
        latitude:req.body.latitude
    })
    const save= await user.save()
    res.status(200).send("Object created")
})

module.exports = router;