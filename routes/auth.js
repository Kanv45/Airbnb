//External imports
const express = require('express')
const router= express.Router()
//Internal imports
const authController=require('../controller/Auth')  

router.get('/auth/login',authController.getLogin)
router.post('/auth/login',authController.postLogin)
router.post('/logout',authController.Logout)
router.get('/auth/signup',authController.getSignup)
router.post('/auth/signup',authController.postSignup)
exports.authRoute= router;
