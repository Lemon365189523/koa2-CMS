const router = require('koa-router')()
const userController = require('./../controllers/api/MewDiary/user')


const routers = router
  .post('/login',userController.login)
  .post('/register',userController.register)
  .post('/uploadUserAvatar',userController.uploadUserAvatar)
  .post('/getSMSCode',userController.sendSMSCode)

module.exports = routers