
const UserModel = require('../../../models/MewDiary/userModel')
//用于密码加密
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const tokenTool = require("../../../utils/token")
const sha1 = require("../../../utils/cryption").sha1
const uploadFile = require("../../../utils/upload").uploadFile
const removeTemImage = require("../../../utils/upload").removeTemImage
const upToQiniu = require("../../../utils/qiniuHelper").upToQiniu
const {sendSMS, getRandomCode, queryCode} = require("../../../utils/smsHelper")

class UserController {

    async login(ctx){
        console.log("登录喵喵日记")
        let phoneNumber = ctx.request.body.phoneNumber;
        console.log(ctx.request.body.password)
    
        let password = sha1(ctx.request.body.password)

        let res = await UserModel.findOne({phoneNumber:phoneNumber})
        if (!res) {
            ctx.status = 200
            ctx.body = {
                msg: '用户不存在',
                code: 1
            }
            return
        }else if (res.password == password){
            console.log("密码一致")
            let token = tokenTool.createToken(phoneNumber)
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
        let phoneNumber = ctx.request.body.phoneNumber
        let password = sha1(ctx.request.body.password)
        let code = ctx.request.body.smsCode

        try {
            let qCode = await queryCode(phoneNumber)
            console.log("查询的验证码：" + qCode)
            console.log("用户输入的验证码：" + code)
            if (qCode == code) {
                let doc = await UserModel.findOne({phoneNumber: phoneNumber})
                //判断用户是否注册
                if (doc){
                    console.log('用户已经存在')
                    ctx.status = 200
                    ctx.body = {
                        code : 1,
                        msg : "该用户已注册！"
                    }
                }else {
                    let newUser = UserModel({
                        phoneNumber: phoneNumber,
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
            }else {
                console.log('验证码错误')
                ctx.status = 200
                ctx.body = {
                    code : 1,
                    msg : "验证码错误！"
                }
            }
        }catch(error){
            console.log(error)
            ctx.status = 200
            ctx.body = {
                code : 1,
                msg : "服务器出错！"
            }
        }
        

        
 
    }

    async sendSMSCode(ctx){
        console.log("发送验证码")
        let phoneNumber = ctx.request.body.phoneNumber
        let code = getRandomCode()
        try {
            let result = await sendSMS( phoneNumber , code , "register")
            console.log(result)
            ctx.status = 200
            ctx.body = {
                code: 1,
                msg : "发送成功"
            }
        }catch(e) {
            ctx.status = 200
            ctx.body = {
                code: 0,
                msg : "发送失败"
            }
        }
    }

    async uploadUserAvatar(ctx){
        console.log("上传用户头像")
        // //根据移动端定义的key获取上传文件
        // const file = ctx.request.files["user_avatar"]

        //1.保存到本地
        const result = await uploadFile(ctx, {
            fileType: "image",
            uploadType: "user_avatar"
        })
        if (!result) {
            ctx.status = 200
            ctx.body = {
                code : 0,
                msg : "保存到服务器失败"
            }
            return
        }
        const imagePath = result.imagePath
        const imageKey = result.imageKey
        //2.更新到七牛
        const qiniuResult = await upToQiniu(imagePath, imageKey)
        console.log(qiniuResult)
        //3.写入用户Model的avatar中

        //4.删除本地图片
        removeTemImage(imagePath)

        if (result) {
            ctx.status = 200
            ctx.body = {
                code : 1,
                msg : "上传成功"
            }
        } else{
            ctx.status = 200
            ctx.body = {
                code : 0,
                msg : "上传头像失败"
            }
        }


    }
    
}

module.exports = new UserController();