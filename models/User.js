const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"],
        unique:true,
        trim:true,
        maxlength:[50,`Name cannot be more than 50 chars`]
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique:true,
        match:[/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,'please add a valid email']
    },
    role:{
        type:String,
        required:[true,'Please add a role']
    },
    password:{
        type:String,
        required:[true,'please add password'],
        minlength:6,
        select:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});
UserSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        // expiresIn:process.env.JWT_EXPIRE
        expiresIn: '24h'
    })
};
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model('User',UserSchema);