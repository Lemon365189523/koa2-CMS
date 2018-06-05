
const AdminModel = require('../models/admin.model');
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');

class ApiController {

    constructor(){

    }

    //根据用户名查找用户
    this.findUser = findUser(username){
      return new Promise((resolve, reject) => {
        AdminModel.findOne({ username }, (err, doc) => {
          if(err){
            reject(err);
          }
          resolve(doc);
        });
      });
    };

    //找到所有用户
    findAllUsers() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, doc) => {
                if(err){
                    reject(err);
                }
                resolve(doc);
            });
        });
    };
     //删除某个用户
    delUser(id){
        return new Promise(( resolve, reject) => {
            User.findOneAndRemove({ _id: id }, err => {
                if(err){
                    reject(err);
                }
                console.log('删除用户成功');
                resolve();
            });
        });
    };

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
        let registerUser = ctx.request.body;
        // let user = new AdminModel({
        //     username: ctx.request.body.name,
        //     password: sha1(ctx.request.body.pass), //加密
        //     token: createToken(this.username), //创建token并存入数据库
        //     create_time: moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss'),//将objectid转换为用户创建时间
        // });

        let doc = await findUser(registerUser.userName)
        if (doc) {
            console.log('该用户已注册');
            ctx.status = 200;
            ctx.body = {
                success: false,
                message: '该用户名已注册'
            }
        }else{
            await new Promise((resolve , reject) => {
                let user = new AdminModel({
                    username: ctx.request.body.userName,
                    password: ctx.request.body.password,
                    createdAt: moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss'),//将objectid转换为用户创建时间
                })
            })
            console.log('注册成功')
            ctx.status = 200;
            ctx.body = {
                success: true,
                message: "注册成功"
            }
        }

    }

}

module.exports = new  ApiController();