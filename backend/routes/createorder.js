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
    orderStatus:orderStatus
   })
   const save= await order.save()
   res.status(200).send(order)

})

module.exports = router;