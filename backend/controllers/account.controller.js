const { validationResult } = require('express-validator');
const accountModel=require('../models/accounts.model')
const mongoose=require('mongoose')


module.exports.getBalance=async(req,res,next)=>{
    console.log(req.user);
    const balance=await accountModel.findOne({
        userId:req.user._id
    })
    const bal=balance.balance
    res.status(200).json({ bal }); 
}

module.exports.transfer=async(req,res,next)=>{
    // const session=await mongoose.startSession();
    // session.startTransaction();
    const{to,amount}=req.body;
    // console.log(req.user);

    // const account=await accountModel.findOne({userId:req.user._id}).session(session);
    const account=await accountModel.findOne({userId:req.user._id})
    if(!account || account.balance<amount){
        // await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }

    // const  toAccount=await accountModel.findOne({userId:to}).session(session);
    const  toAccount=await accountModel.findOne({userId:to})
    if(!toAccount){
        // await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    // await accountModel.updateOne({userId:req.user._id},{$inc:{balance:-amount}}).session(session);
    // await accountModel.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    await accountModel.updateOne({userId:req.user._id},{$inc:{balance:-amount}})
    await accountModel.updateOne({userId:to},{$inc:{balance:amount}})
    // await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    })
}