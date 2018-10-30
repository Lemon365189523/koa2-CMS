const qiniu = require('qiniu')
const fs = require('fs')
const account = require('../codes/account')
let AccessKey = account.qiniu_accessKeyId
let SecretKey = account.qiniu_secretKey

var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey)

var qiniuCofig = new qiniu.conf.Config();
//z2 是华南
qiniuCofig.zone = qiniu.zone.Zone_z2
let bucket = account.qiniu_bucket
const putPolicy = new qiniu.rs.PutPolicy({
    scope:  bucket
})
const uploadToken = putPolicy.uploadToken(mac)
var bucketManager = new qiniu.rs.BucketManager(mac, qiniuCofig);

function upToQiniu(filePath, key) {
    
    const PutExtra = new qiniu.form_up.PutExtra();
    const formUploader =  new qiniu.form_up.FormUploader(qiniuCofig);

    return new Promise((resolved, reject) => {
        formUploader.put(uploadToken, key, filePath, PutExtra, function(respErr, respBody, respInfo){
            if (respErr){
                reject(respErr)
            }else{
                resolved(respBody)
            }
        })
    })
}

function removeObject(key){
    return new Promise((resolved, reject) => {
        bucketManager.delete(bucket ,key ,function(err, respBody, respInfo) {
            if (err){
                reject(err)
            }else {
                resolved(respBody)
            }
        })
    })
}

module.exports = {
    upToQiniu,
    removeObject
}






