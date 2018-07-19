
const AdminModel = require('../models/admin.model');
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
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
            ctx.body = {
                success: true ,
                message: '登录成功',
                token: jsonwebtoken.sign({ userName: userName, password: password }, "jwt_secret")
            }
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

}

module.exports = new ApiController();