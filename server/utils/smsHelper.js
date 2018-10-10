const SMSClient = require("@alicloud/sms-sdk")
const accessKeyId = 'LTAIzb7iZMWDvndJ'
const secretAccessKey = 'MoGmdPQ9exGt0AM1t4J816CaYw0tdL'
let smsClient = new SMSClient({accessKeyId , secretAccessKey})

function sendSMS(phoneNumber , code) {
    return new Promise((resolve ,reject) => {
        smsClient.sendSMS({
            PhoneNumbers: phoneNumber,
            SignName: '云通信产品',
            TemplateCode: 'SMS_147417295',
            TemplateParam: '{"code":"' + code + '"}'
        }).then(function(res){
            resolve(res)
        },function(err){
            reject(err)
        })
    })
}


module.exports = {
    sendSMS
}