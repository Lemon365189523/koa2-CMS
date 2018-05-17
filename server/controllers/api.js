
const AdminModel = require('../models/admin.model');

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
        
    }

}

module.exports = new  ApiController();