const jwt =require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utills/errorResponse');
exports.protect = asyncHandler(async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401));
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    }catch(err){
        // console.log(err);
        // return next(new ErrorResponse('Not authorized to access this route',400));
        return res.status(400).json({success:true,msg:err})
    }

});