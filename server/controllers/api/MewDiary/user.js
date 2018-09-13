
const UserModel = require('../../../models/MewDiary/userModel')
//用于密码加密
const sha1 = require("sha1")
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const tokenTool = require("../../../utils/token")

class UserController {

    async login(ctx){
        console.log("登录喵喵日记")
        let username = ctx.request.body.name;
        let password = sha1(ctx.request.body.password);

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
            // let token = tokenTool.createToken(username)
            ctx.status = 200
            ctx.body = {
                code : 0,
                msg : "登录成功",
                data: res
                // token : token
            }
        } else {
            ctx.status = 200
            ctx.body = {
                code : 1 ,
                msg : "密码错误"
            }
        }

    }
    
}

module.exports = new UserController();