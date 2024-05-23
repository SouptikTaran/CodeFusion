const router = require('express').Router() ;
const userController = require('../controllers/user')


router.get('/Signin' , userController.Signin)
router.get('/Login' , userController.Login)
router.get('/Logout' , userController.logout)

router.post('/Signin' , userController.SignUser)
router.post('/Login' , userController.LoginUser)

module.exports= router