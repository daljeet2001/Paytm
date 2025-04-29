const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const redisClient =require('../services/redis.service');
const accountModel=require('../models/accounts.model')


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname,lastname, username, password } = req.body;


    const isUserAlready = await userModel.findOne({ username });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: firstname,
        lastname: lastname,
        username,
        password:hashedPassword,
    });
    await accountModel.create({
        userId:user._id,
        balance:1+Math.random()*10000,
    })

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
   
}


module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
    
}

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
    res.status(200).json({ message: 'Logged out' });
}

module.exports.updateUser=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // const { firstname,lastname, username, password } = req.body;

    const updateData = { ...req.body };

    // Hash password if it's being updated
    if (updateData.password) {
       updateData.password= await userModel.hashPassword(updateData.password);
    }

    await userModel.updateOne({ _id: req.user._id }, updateData);
    // console.log(updatedUser)
    res.status(200).json({ message: 'User updated succesfully'});
}

module.exports.allUser=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {filter}=req.query;
    const users=await userModel.find({
        $or:[{
            firstname: { "$regex": filter, "$options": "i" }
        },{
            lastname: { "$regex": filter, "$options": "i" }
        }]
    })
    
    res.status(200).json({users});
}
