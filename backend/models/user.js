const mongoose = require("mongoose");


const User= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
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
        required:true
    },
    phoneNumber:{
       type:String,
       required:true
    }
})

module.exports = mongoose.model("User", User);