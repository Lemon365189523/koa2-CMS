const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // id: {type: String, required: true},
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, //密码
  createdAt: { type: Date, default: Date.now }, //创建时间
  avatar:{type : String, default: ""},
  nickname:{type : String, default: ""},
  phoneNumber:{type : String, default:""},
  sex : {type : Number, default: 0}, //1为男 ，2为女
  updateAt:{type: Date, default: Date.now}
});

//扩展方法
//实例方法
// UserSchema.methods.test = function(cb){
// }
//查询方法
// UserSchema.query.byName = function(name){}

//静态方法
// UserSchema.static.findByName = function(name, cb){}

module.exports = mongoose.model('appUser', UserSchema);