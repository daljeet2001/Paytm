const express=require('express');
const router=express.Router();
const {body,query,validationResult}=require('express-validator');
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

router.put('/update',authMiddleware.authUser,[
body('firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long').optional(),
body('lastname').isLength({min:3}).withMessage('Last name must be atleast 3 characters long').optional(),
body('username').isLength({min:3}).withMessage('username must be atleast 3 characters long').optional(),
body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long').optional()
],
userController.updateUser)

router.get('/all',authMiddleware.authUser,
    query('filter').isString().isLength({ min: 2 }).withMessage('Invalid filter'),
    userController.allUser);

module.exports=router;