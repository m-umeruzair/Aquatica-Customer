const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderStatus:{
    type: String,
  },
  orderDeliveredBy:{
    type:String,
  },
  orderItems:{
    type:Array
  },
  orderPlacedby:{
    type:String
  },
  orderDate:{
    type:Date
  }
})

module.exports = mongoose.model("orders", orderSchema);