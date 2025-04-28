const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const userController=require('../controllers/user.controller');
const userModel=require('../models/user.model');
const authMiddleware=require('../middlewares/auth.middleware')



router.post('/register',[
body('firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
body('lastname').isLength({min:3}).withMessage('Last name must be atleast 3 characters long'),
body('username').isLength({min:3}).withMessage('username must be atleast 3 characters long'),
body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')
],
userController.registerUser
)

router.post('/login', [
    body('username').isLength({min:3}).withMessage('Invalid Username'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports=router;