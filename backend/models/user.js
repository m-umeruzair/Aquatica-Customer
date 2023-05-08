const mongoose = require("mongoose");


const User= new mongoose.Schema({
    fullName:{
        type:String,
        
    },
    cnic:{
        type:Number,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        
    },
    phoneNumber:{
       type:String,
       required:true
    }
})

module.exports = mongoose.model("User", User);