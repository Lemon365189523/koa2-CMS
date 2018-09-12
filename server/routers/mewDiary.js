const router = require('koa-router')()
const userController = require('./../controllers/api/MewDiary/user')

const routers = router
  .get('/login',userController.login() )


  module.exports = routers