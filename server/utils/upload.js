const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const UtilType = require('./type')
const UtilDatetime = require('./datetime')

// 写入目录
function mkdirsSync(dirname) {
    // console.log(dirname)
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  }

function getSuffix(fileName) {
    return fileName.split('.').pop()
}

// 重命名
function Rename(fileName) {
    return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}

// 删除文件
function removeTemImage(path) {
    fs.unlink(path, (err) => {
      if (err) {
        throw err
      }
    })
}

// 上传到本地服务器
function uploadFile(ctx, options) {
    const fileType = options.fileType
    const uploadType = options.uploadType
    const file = ctx.request.files[uploadType]
    // 文件保存地址
    const filePath = path.join(__dirname, '../upload-files') + `/${fileType}`
    const confirm = mkdirsSync(filePath)
    if (!confirm) {
        return
    }
    
    return new Promise((resolve, reject) => {
        // 创建可写流
        const reader = fs.createReadStream(file.path)
        // 文件实际保存地址
        const path = filePath + `/${UtilDatetime.parseStampToFormat(null, 'YYYYMMDDhhmmss')}_${file.name}`
        console.log(path);
        
        // 创建可写流
        const upStream = fs.createWriteStream(path)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)

        reader.on('end',function(){
            resolve({
                imagePath : path,
                imageKey : file.name
            })
        })
        
        reader.on('error', function(err){
            reject(err)
        })
    })
}

module.exports =  {
    uploadFile,
    removeTemImage
}