const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add product name"],
        unique:true,
        maxlength: [50,'name cannot be more than 50 chars']
    },
    price:{
        type:String,
        required:[true,'please add price'],

    },
    description:{
        type:String,
        required:[true,'please add description'],
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

}) ;
module.exports = mongoose.model('Product',ProductSchema);