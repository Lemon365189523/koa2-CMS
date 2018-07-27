/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/api/user');

const routers = router
  .get('/user/getUserInfo.json',userController.getUserInfo )
  .post('/user/signIn.json',userController.loginAction)
  .post('/user/signUp.json',userController.registerAction )
 
  
module.exports = routers
