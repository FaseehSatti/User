const asyncHandler = require('../middleware/async');
const Product = require('../models/Products');
const ErrorResponse = require('../utills/errorResponse');

// Create Product
// POST
exports.createProduct = asyncHandler(async(req,res,next)=>{
    //ADD USER TO REQ.BODY
    req.body.user = req.user.id;
    //creating product
    const products = await Product.create(req.body);
    res.status(200).json({success:true,data:products});
});
// Get All Products
// Get
exports.getProducts = asyncHandler(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({success:true,data:products});
});
//Get Single Products
// Get
exports.getProduct = asyncHandler(async(req,res,next)=>{
    const products = await Product.findById(req.params.id);
    if(!products){
        return next(new ErrorResponse(`Product not found with the id of ${req.params.id}`,404));
    }
    res.status(200).json({success:true,data:products});
});
//Update Products
// Put
exports.updateProduct = asyncHandler(async(req,res,next)=>{
    let products = await Product.findById(req.params.id);
    console.log(products.user);
    if(!products){
        return next(new ErrorResponse(`Product not found with the id of ${req.params.id}`,404));
    }
    // Make sure user is product owner
    if(products.user.toString() !== req.user.id){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this product`,404))
    } 
    
    products = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({success:true,data:products});
});
//Delete Products
// Delete
exports.deleteProduct = asyncHandler(async(req,res,next)=>{
    let products = await Product.findById(req.params.id);
    console.log(products.user);
    if(!products){
        return next(new ErrorResponse(`Product not found with the id of ${req.params.id}`,404));
    }
    if(products.user.toString() !== req.user.id){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this product`,404))
    } 
    products = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true,data:{}});
});