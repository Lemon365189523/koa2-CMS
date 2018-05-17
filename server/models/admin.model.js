const mongoose = require('mongoose');
//Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力。
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  name: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, //密码
  createdAt: { type: Date, default: Date.now }, //创建时间
  // updateAt:
});


module.exports = mongoose.model('AdminUser', AdminUserSchema);