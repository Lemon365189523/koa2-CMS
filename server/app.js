const path = require('path') // 用于处理目录路径
const Koa = require('koa') // web开发框架
const convert = require('koa-convert') 
const views = require('koa-views') 
const koaStatic = require('koa-static') // 静态资源处理
const koaBody = require('koa-body')
const koaLogger = require('koa-logger')
const config = require('./../config') //配置文件
const routers = require('./routers/index') //路由
const jwt = require('koa-jwt') // 用于路由权限控制
const jsonwebtoken = require('jsonwebtoken')
const errorHandle = require('./middlewares/errorHandle')
require('./utils/db')

const app = new Koa()

app.use(errorHandle);

app.use(jwt({secret:"jwt_secret"})
  .unless({
    //数组中的路径不需要通过jwt验证
    path: [/\/admin/, 
           /\/api\/user\/signIn.json/, 
           /\/api\/user\/signUp.json/,
           /\/output/, 
           /\/favicon.ico/,
           /\/work/,
           /\//
          ],
  }))


// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
// app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

//koa-body 代替 koa-bodyparser（解析body） 和 koa-multer(上传)
app.use(koaBody({
  multipart : true,// 支持文件上传
  formidable:{
    // uploadDir:path.join(__dirname,'upload-files'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    }
  }
}))

// 初始化路由中间件
app.use(routers.routes())
   .use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
