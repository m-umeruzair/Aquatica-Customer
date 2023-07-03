const express = require("express");
const User = require("../models/user");

const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds= 10

router.put('/updatepassword', async(req,res)=>{
     var a= req.body.data.email
     console.log(a)

     var hashedPassword;
     // console.log(req.body.password)
     await bcrypt.genSalt(saltRounds).then(salt=>{
        return bcrypt.hash(req.body.data.password, salt)}).then(hash=>{
             hashedPassword = hash
            
         });

     await User.updateOne({email:a},{$set:{password:hashedPassword}})

     res.status(200).send()
})

module.exports = router;