const qiniu = require('qiniu')
const fs = require('fs')
let AccessKey = 'Fpl9k7dZznz7ukMA7lYdiN9GGWyul-Rh9_lFqn4O'
let SecretKey = '78fUYQNDc5pe-OuLzP1Wu6BgjvA4u52qavL9hrfI'

var mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey)

var qiniuCofig = new qiniu.conf.Config();
//z2 是华南
qiniuCofig.zone = qiniu.zone.Zone_z2
let bucket = "lemonfan"
const putPolicy = new qiniu.rs.PutPolicy({
    scope:  bucket
})
const uploadToken = putPolicy.uploadToken(mac)

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

module.exports = {
    upToQiniu
}






