const router = require('koa-router')()
const userController = require('./../controllers/api/MewDiary/user')
const articeController = require("./../controllers/api/MewDiary/article")

const routers = router
  .post('/login',userController.login)
  .post('/register',userController.register)
  .post('/uploadUserAvatar',userController.uploadUserAvatar)
  .post('/getSMSCode',userController.sendSMSCode)
  .post('/atricle/add', articeController.addArticle)

module.exports = routers