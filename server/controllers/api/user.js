
const AdminModel = require('../../models/admin.model');
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//jsonwebtoken用于生成token下发给浏览器
const jsonwebtoken = require('jsonwebtoken')

class ApiController {

    constructor(){

    }


    async loginAction(ctx){
        let result = {
            success: false,
            message: '用户不存在'
        };
        //从请求体中获得参数

        const { userName , password} = ctx.request.body;

        let user = await AdminModel.findOne({userName});
        if (!user) {
            ctx.status = 401
            ctx.body = {
              message: '用户名错误',
              success: false
            }
            return
        }

        //判断密码是否正确
        if (password == user.password){
            //登录成功
            let token = jsonwebtoken.sign({
                data: user,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, "jwt_secret");

            ctx.body = {
                success: true ,
                message: '登录成功',
                token: token
            }
            //'Authorization':  'Bearer ' + DEMO_TOKEN
            console.log('====================================');
            // console.log(ctx.res);
            console.log('====================================');
            // ctx.req.header('Authorization','Bearer '+ token)
        }else{
            ctx.body = {success: false, message: '密码错误'}
        }
    
    }
    
    async registerAction(ctx){
        console.log('====================================');
        console.log(ctx.request.body);
        console.log('====================================');
        const { userName , password} = ctx.request.body;
        
        let user = await  AdminModel.findOne({userName})
        if (user) {
            ctx.body =  {success: false, message : "该账号已注册"}
        }else {
            const newUser = new AdminModel({
                userName: userName,
                password: password,
            })
            user = await newUser.save()
            console.log('注册成功')
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: "注册成功"
            }
        }

    }

    async getUserInfo(ctx){
        const { userName } = ctx.request.body;
        let user = await  AdminModel.findOne({userName})
        if (!user) {
            ctx.body = {
                success: false,
                message: "没有该账号信息"
            }
        }else{
            ctx.body = {
                success: true,
                data: {
                    userName: user.userName,
                    createdAt: user.createdAt
                }
            }
        }
    }

    async getUsers(ctx){
        const {pageIndex, pageSize} = ctx.request.body
        let users = await AdminModel.find({}).limit(pageSize).skip(pageIndex).exec()
        if (users) {
            ctx.body = {
                success : true,
                data : users
            }
        }else{
            ctx.body = {
                success : false,
                message : "没有找到数据"
            }
        }
    }

    

}

module.exports = new ApiController();