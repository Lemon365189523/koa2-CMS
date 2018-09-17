const qiniu = require('qiniu')
const fs = require('fs')
let AccessKey = 'Fpl9k7dZznz7ukMA7lYdiN9GGWyul-Rh9_lFqn4O'
let SecretKey = '78fUYQNDc5pe-OuLzP1Wu6BgjvA4u52qavL9hrfI'

var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey)

var qiniuCofig = new qiniu.conf.Config();
//z2 是华南
qiniuCofig.zone = qiniu.zone.Zone_z2
const putPolicy = new qiniu.rs.PutPolicy({})
const uploadToken = putPolicy.uploadToken(mac)
let bucket = "lemonfan"

// function run(fileInfo) {
//     return new Promise((resolve , reject) => {
//         //async .waterfall多个函数依次执行，且前一个的输出为后一个的输入
//         async .waterfall([
//             function(callback) {
//                 callback(null, fileInfo);
//             },
//             function (fileInfo, callback){
                
//             }
//         ])
//     })
// }







