const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');


const accountSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance:{
        type:Number,
        default:0,
    }

})

const accountModel=mongoose.model('account',accountSchema);
module.exports=accountModel;