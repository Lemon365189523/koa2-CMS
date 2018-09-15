/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/api/CMS/user');

const routers = router
  .get('/user/getUserInfo.json',userController.getUserInfo )
  .post('/user/getAllUser.json',userController.getUsers)
  .post('/user/signIn.json',userController.loginAction)
  .post('/user/signUp.json',userController.registerAction )
  .post('/user/deleteUser.json',userController.deleteUser)
  .post('/user/updateUser.json',userController.updateUser)
 
  
module.exports = routers
