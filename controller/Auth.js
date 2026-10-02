const { check, validationResult } = require("express-validator")
const User= require('../model/user')
const bcrypt = require('bcryptjs')
exports.getLogin=(req,res,next)=>{
  res.render('auth/login',{
      isLoggedIn:false
  })
}
exports.postLogin=async(req,res,next)=>{
  console.log("User logged in",req.body)
  const {email , password} = req.body
  const user=await User.findOne({email})
  console.log(user)
  if(!user){
    return res.status(422).render('auth/login',{
      errorMessages:['User does not exist'],
      oldInput:{email},
      isLoggedIn:false
    })
  }
  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
     return res.status(422).render('auth/login',{
      errorMessages:['Incorrrect password'],
      oldInput:{email},
      isLoggedIn:false
    })
  }
   
      req.session.isLoggedIn=true
     req.session.userId= user._id.toString()
     console.log(req.session)
      res.redirect('/');

}
exports.Logout=(req,res,next)=>{
    req.session.destroy(()=>{
 res.redirect('/auth/login');
    })    
}
exports.getSignup=(req,res,next)=>{
  res.render('auth/signup',{
      isLoggedIn:false
  })
}
exports.postSignup=[
  //First Name Validation
  check('Firstname')
  .notEmpty()
  .withMessage('First Name is required')
  .trim()
  .isLength({ min:2 })
  .withMessage('First name must be at least 2 chracters long')
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('First name can only contain letters'),
  //Last Name validation
  check('Lastname')
  .notEmpty()
  .withMessage('Last Name is required')
  .trim()
  .isLength({ min:2 })
  .withMessage('First name must be at least 2 chracters long')
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('First name can only contain letters'),
  //Email validation
  check('email')
  .isEmail()
  .withMessage('Please enter a valid email')
  .normalizeEmail(),
  //user type validation
  check('userType')
  .notEmpty()
  .withMessage('Usertype is required')
  .isIn(['guest','host'])
  .withMessage("Invalid user type"),
  //Password Validation
 check('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage('Password must contain at least one special character')
  .trim(),
  check('Confirmpassword')
  .trim()
  .custom((value,{req})=>{
    if(value!==req.body.password){
      throw  new Error('Passwords dont match')
    }
    return true
  }),
  check('termsAccepted')
  .notEmpty()
  .withMessage('You must accept the terms and conditions')
  .custom((value)=>{
    if(value!== 'on'){
      throw new Error('You must accept the terms and conditions')
    }
    return true;
  }),
  (req,res,next)=>{
  const {Firstname,Lastname,email,userType,password}=req.body;
  const errors= validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).render('auth/signup',{
      pageTitle : 'Signup',
      isLoggedIn: false,
      errorMessages :errors.array().map(error=>error.msg),
      oldInput:{
        Firstname,
        Lastname,
        email,
        userType,
        password
      }
    })
  }
  console.log(req.body)
  bcrypt.hash(password,12).then((hashedPassword)=>{
    const user= new User({
        Firstname,
        Lastname,
        email,
        userType,
        password:hashedPassword
  })
  user.save().then(()=>{
   res.redirect('/auth/login')
  }).catch((err)=>{
  console.log("Error while creating a new User",err)
  })
  })
  }
]