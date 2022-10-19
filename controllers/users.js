const User = require('../models/User');

exports.createUser = async(req,res,next) =>{
    try{
        const user = await User.create(req.body);
        res.status(200).json({success:true,data:user});
    }catch(err){
        next(err);
    }
    // req.write('data is sent');
}