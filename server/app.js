const path = require('path') // 用于处理目录路径
const Koa = require('koa') // web开发框架
const convert = require('koa-convert') 
const views = require('koa-views') 
const koaStatic = require('koa-static') // 静态资源处理
const bodyParser = require('koa-bodyparser') // 用于查询字符串解析到`ctx.request.query`
const koaLogger = require('koa-logger')
const config = require('./../config') //配置文件
const routers = require('./routers/index') //路由
const jwt = require('koa-jwt') // 用于路由权限控制
const jsonwebtoken = require('jsonwebtoken')
const errorHandle = require('./middlewares/errorHandle')
require('./utils/db')

const app = new Koa()

// app.use(jwt({secret:"jwt_secret"})
//   .unless({
//     //数组中的路径不需要通过jwt验证
//     path: [/\/admin/, 
//            /\/api/, 
//            /\/output/, 
//            /\/favicon.ico/
//           ],
//   }))

app.use(errorHandle);

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
