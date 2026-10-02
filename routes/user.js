//External imports
const express = require('express')
const userRoute = express.Router()
//Internal imports
const HomeController=require('../controller/home')  
userRoute.get('/',HomeController.HomePage)
userRoute.get('/home-list',HomeController.HomeList)
userRoute.get('/user/home/favHomes',HomeController.getFavourites)
userRoute.get('/user/home/bookings',HomeController.Bookings)
userRoute.get('/user/home/:homeId',HomeController.Details)
userRoute.post('/favourites',HomeController.postFavourites)

module.exports=userRoute;