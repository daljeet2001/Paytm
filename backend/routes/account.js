const express=require('express');
const router=express.Router();
const {body,query,validationResult}=require('express-validator');
const accountController=require('../controllers/account.controller');
const authMiddleware=require('../middlewares/auth.middleware')

router.get('/balance',authMiddleware.authUser,accountController.getBalance);
router.post('/transfer',authMiddleware.authUser,[
    body('to').isMongoId().withMessage('Invalid reciever id'),
    body('amount').isNumeric().withMessage('amount must be a number')
],accountController.transfer);

module.exports=router;