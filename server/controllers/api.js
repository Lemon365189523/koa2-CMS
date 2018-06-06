
const AdminModel = require('../models/admin.model');
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');

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
        await AdminModel.findOne({
            userName
        }, (err , user)=>{
            if (err) {
                throw err;
            }
            if (!user){

                ctx.body = result;
            }else{
                //判断密码是否正确
                if (password == user.password){
                    ctx.body = {success: true ,message: '登录成功'}
                }else{
                    ctx.body = {success: false, message: '密码错误'}
                }
            }
        })
    }
    
    async registerAction(ctx){
        console.log('====================================');
        console.log(ctx.request.body);
        console.log('====================================');
        const { userName , password} = ctx.request.body;

        AdminModel.findOne({
           userName
        },(err, user)=>{
            if (user) {
                ctx.body =  {success: false, message : "该账号已注册"}
            }else {
                console.log('--开始注册--')
                let user = new AdminModel({
                    userName: userName,
                    password: password,
                })
                user.save( (err)=> {
   
                    if(err){
                        ctx.status = 200;
                        ctx.body = {
                            success: true,
                            message: err.message
                        }
                    }else{
                        console.log('注册成功')
                        ctx.status = 200;
                        ctx.body = {
                            success: true,
                            message: "注册成功"
                        }
                    }
                }) 

            }
        })

    }

}

module.exports = new  ApiController();