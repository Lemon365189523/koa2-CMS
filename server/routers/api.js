/**
 * restful api 子路由
 */

const router = require('koa-router')()
const apiController = require('../controllers/api');

const routers = router
  // .get('/user/getUserInfo.json', )
  .post('/user/signIn.json',apiController.loginAction)
  .post('/user/signUp.json',apiController.registerAction )
 
  
module.exports = routers
