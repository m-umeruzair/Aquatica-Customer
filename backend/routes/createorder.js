const express = require("express");
const Order = require('../models/order')
const router = express.Router();



router.post('/createOrder',async(req,res)=>{
    var orderStatus= req.body.orderStatus
    var orderItems= req.body.orderItems
    var orderPlacedby= req.body.orderPlacedby
   const order= new Order({
    orderItems:orderItems,
    orderPlacedby:orderPlacedby,
    orderStatus:orderStatus,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    orderDate:req.body.orderDate,
    customerName:req.body.customerName,
    customerNumber:req.body.customerNumber,
    orderAmount:req.body.orderAmount
   })
   const save= await order.save()
   res.status(200).send(order)

})

module.exports = router;