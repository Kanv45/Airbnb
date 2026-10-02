//External imports
const express = require('express')
const router= express.Router()
//Internal imports
const homeController=require('../controller/home')  

router.get('/user/home',homeController.AddaHome)
router.post('/user/added',homeController.HomeAdded)
router.get('/host-list',homeController.HostList)
router.get('/host/edit/:homeId',homeController.getEditHome)
router.post('/edit-home',homeController.postEditHome)
router.get('/host/delete/:homeId',homeController.deleteHome)
exports.hostRoute= router;
