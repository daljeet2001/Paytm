const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient =require('../services/redis.service');



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
   
    const isBlackListed = await redisClient.get(token);

    if (isBlackListed) {

        res.cookie('token', '');

        return res.status(401).send({ error: 'Unauthorized User' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}