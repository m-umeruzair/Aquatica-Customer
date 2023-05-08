const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcryptjs');



async function validateUser(hash,pass) {
    var a= false
    
   await bcrypt
      .compare(pass, hash)
      .then(res => {
        console.log(res) 
        a=res
      })
      .catch(err => console.error(err.message))   
      
      return a     
  }

  router.get('/log-in',async(req,res)=>{
    var email=req.query.email;
       
    var a= await User.find({'email':email})
      if(Object.keys(a).length!=0) {
      var pass= a[0].password
  
       if(await validateUser(pass,req.query.password)==true){
        res.status(200).send(a)
        console.log('Done')
       }
       else {
        res.status(401).send()
        console.log('Wrong Pass')
       }
        }
      else{
          res.status(404).send()
          console.log('Email not found')
         }
  })

  module.exports = router;