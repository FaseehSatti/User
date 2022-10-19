const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utills/errorResponse');
exports.register =asyncHandler(async(req,res,next)=>{
    // console.log(req.body);
        const {name,email,password,role}=req.body;
        const user = await User.create({name,email,password,role});
        // res.status(200).json({success:true,data:"jshdi"});
        const token = user.getSignedJwtToken();
        res.status(200).json({success:true,data:user,token});
        // res.status(404).json({success:true,data:"Error"});
        // console.log(err);
});
exports.login =asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        // return next(new ErrorResponse("invalid ceredentials",400));
        return res.status(400).json({success:true,error:"invalid ceredentials"});
    }

    // if(!email){
    //     return next(new ErrorResponse("invalid ceredentials",400));
    // }
    // if(!password){
    //     return next(new ErrorResponse("invalid",400));
    // }


    const user = await User.findOne({email}).select('+password');
    // const user = await User.findOne({email,password});
        // res.status(404).json({success:true,data:"Error"});
        if(!user){
           return res.status(400).json({success:false,error:"invalid ceredentials"});
        }
        //password match
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({success:false,error:"wrong ceredentials"})
        }
        // const isMatch = await user.matchPassword(password);
        res.status(200).json({success:true,data:user});
});