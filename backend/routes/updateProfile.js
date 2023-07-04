const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds= 10
const nodemailer = require("nodemailer");

router.post('/updateProfile' ,async(req,res)=>{
    var user
    console.log('hit')
      if(req.body.fullName==null && req.body.email==null && req.body.password==null && req.body.phoneNumber==null && req.body.address== null){
        res.status(400).send()
      }
      else{
      if (req.body.email!=null){
        var email=req.body.email;
        var id= req.body.id
      
          await User.findOneAndUpdate({_id:id},{$set:{email:email}})
          user = await User.find({_id:id})

      }

      if(req.body.password!=null){
        var hashedPassword;
        // console.log(req.body.password)
        await bcrypt.genSalt(saltRounds).then(salt=>{
           return bcrypt.hash(req.body.password, salt)}).then(hash=>{
                hashedPassword = hash
               
            });
        var id= req.body.id   
         await User.findOneAndUpdate({_id:id},{$set:{password:hashedPassword}})
         user = await User.find({_id:id})
      }

      if (req.body.fullName!=null){
        var id= req.body.id   
         await User.findOneAndUpdate({_id:id},{$set:{fullName:req.body.fullName}})
         user = await User.findOne({_id:id})
        
      }

      if(req.body.phoneNumber!=null){
        var id= req.body.id
        await User.findOneAndUpdate({_id:id},{$set:{phoneNumber:req.body.phoneNumber}})
        user = await User.findOne({_id:id})
      }

      if(req.body.address!=null){
        var id= req.body.id   
        await User.findOneAndUpdate({_id:id},{$set:{address:req.body.address,longitude:req.body.longitude,latitude:req.body.latitude}})
        user = await User.find({_id:id})
      }
      console.log(user)
       res.status(200).json({user:user})
    
    }
})



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


module.exports = router;