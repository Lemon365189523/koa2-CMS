
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
    //code = 0 ,请求成功 code = 1 请求失败

    async loginAction(ctx){
        let result = {
            success: false,
            msg: '用户不存在'
        };
        //从请求体中获得参数

        const { userName , password} = ctx.request.body;

        let user = await AdminModel.findOne({userName});
        if (!user) {
            ctx.status = 401
            ctx.body = {
                msg: '用户名错误',
              success: false,
              code: 1
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
                msg: '登录成功',
                token: token,
                code : 0
            }

        }else{
            ctx.body = {
                success: false, 
                msg: '密码错误',
                code : 1
            }
        }
    
    }
    
    async registerAction(ctx){
        console.log('====================================');
        console.log(ctx.request.body);
        console.log('====================================');
        const { userName , password} = ctx.request.body;
        
        let user = await  AdminModel.findOne({userName})
        if (user) {
            ctx.body =  {
                success: false,
                msg : "该账号已注册",
                code : 1
            }
        }else {
            const newUser = new AdminModel({
                userName: userName,
                password: password,
            })
            user = await newUser.save()
            console.log('注册成功')
            let token = jsonwebtoken.sign({
                data: user,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24 , // 60 seconds * 60 minutes = 1 hour
                }, "jwt_secret");
            ctx.status = 200;
            ctx.body = {
                success: true,
                msg: "注册成功",
                code: 0,
                token: token
            }
        }

    }
    

    async deleteUser(ctx){
        const {userName} = ctx.request.body
        
        let db_data = await AdminModel.remove({userName: userName})
        console.log(db_data)
        //失败
        if (db_data.n == 0){
            ctx.body = {
                code : 1,
                msg : "删除失败",
                data : ""
            }
        }else{
            ctx.body = {
                code : 0,
                msg : "删除成功",
                data : ""
            }
        }
   
    }

    async updateUser(ctx){
        const {userName , newPassword} = ctx.request.body;
        console.log(userName);
        
        let data = await AdminModel.update({userName: userName},{password : newPassword})
        console.log(data)
        if (data.n == 0) {
            ctx.body = {
                code : 1,
                msg : "更新用户失败",
                data : ""
            }
        }else {
            ctx.body = {
                code : 0,
                msg : "更新用户成功",
                data : ""
            }
        }
    }

    async getUserInfo(ctx){
        const { userName } = ctx.request.body;
        let user = await  AdminModel.findOne({userName})
        if (!user) {
            ctx.status = 401
            ctx.body = {
                success: false,
                msg: "没有该账号信息",
                code : 1
            }
        }else{
            ctx.body = {
                code : 0,
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
        const token = ctx.header.authorization  // 获取jwt
        console.log(token)
        await  jsonwebtoken.verify(token,"jwt_secret",async function(err, decoded){
            // console.log(decoded.exp - Date.now()/1000)
            console.log(decoded)
            if (err == null && decoded.exp - Date.now()/1000 >= 0) {
                console.log("=====有效token=====")
                let users = await AdminModel.find({}).limit(pageSize).skip(pageIndex).exec()
                let total = await AdminModel.count()
                if (users) {
                    let list = users.map(user => {
                        var newUser = {}
                        newUser._id = user._id
                        newUser.userName = user.userName
                        newUser.password = user.password
                        newUser.createdAt = user.createdAt.toLocaleString()
                        return newUser
                    })
                    ctx.status = 200
                    ctx.body = {
                        success : true,
                        data : list,
                        total : total,
                        code: 0
                    }
                }else{
                    ctx.body = {
                        success : false,
                        msg : "没有找到数据",
                        code : 1
                    }
                }
            }else {
                console.log("=====无效或过期token=====")
                //跳去登录
                ctx.status = 401 
                ctx.body = {
                    code : 401,
                    msg : "无效或过期token"
                }
            }
        })

    }

}

module.exports = new ApiController();