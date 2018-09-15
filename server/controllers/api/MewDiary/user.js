
const UserModel = require('../../../models/MewDiary/userModel')
//用于密码加密
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const tokenTool = require("../../../utils/token")
const sha1 = require("../../../utils/cryption").sha1

class UserController {

    async login(ctx){
        console.log("登录喵喵日记")
        let username = ctx.request.body.username;
        console.log(ctx.request.body.password)
    
        let password = sha1(ctx.request.body.password)

        let res = await UserModel.findOne({username})
        if (!res) {
            ctx.status = 200
            ctx.body = {
                msg: '用户不存在',
                code: 1
            }
            return
        }else if (res.password == password){
            console.log("密码一致")
            let token = tokenTool.createToken(username)
            ctx.status = 200
            ctx.body = {
                code : 0,
                msg : "登录成功",
                data: res,
                token : token
            }
        } else {
            ctx.status = 200
            ctx.body = {
                code : 1 ,
                msg : "密码错误"
            }
        }

    }

    async register(ctx) {
        console.log("瞄日记:调用注册接口")
        let username = ctx.request.body.username
        let password = sha1(ctx.request.body.password)

        let doc = await UserModel.findOne({username})

        if (doc){
            console.log('用户已经存在')
            ctx.status = 200
            ctx.body = {
                code : 1,
                msg : "该用户已注册！"
            }
        }else {
            let newUser = UserModel({
                username: username,
                password: password
            })
            let user = await newUser.save()
            console.log('注册成功')
            console.log(user)
            ctx.status = 200
            ctx.body = {
                code : 0,
                data : {
                    avatar: user.avatar,
                    nickname: user.nickname,
                    phoneNumber: user.phoneNumber,
                    sex: user.sex,
                    username: user.username
                }
            }
        }
    }
    
}

module.exports = new UserController();