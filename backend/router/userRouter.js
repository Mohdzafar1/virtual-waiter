const express=require('express')
const { createUser, login } = require('../controller/user')
const router=express.Router()



router.post('/create_user',createUser)
router.post('/login',login)


module.exports=router
