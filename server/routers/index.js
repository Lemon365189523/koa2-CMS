/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const adminApi = require('./adminApi')
const admin = require('./admin')
const work = require('./work')
const error = require('./error')

router.use('/', home.routes(), home.allowedMethods())
router.use('/adminApi', adminApi.routes(), adminApi.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())

module.exports = router


