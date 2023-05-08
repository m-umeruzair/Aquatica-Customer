const express = require("express");
const product = require('../models/product')
const router  = express.Router();

router.get("/readProduct" , async(req, res) =>{
    var x= req.query.productType
    
    var Product= await product.find({productType:x})
    res.status(200).send(Product)
})

module.exports = router;