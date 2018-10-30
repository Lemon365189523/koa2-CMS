const SMSClient = require("@alicloud/sms-sdk")
const account = require('../codes/account')
const accessKeyId = account.aliSMS_accessKeyId
const secretAccessKey = account.aliSMS_secretAccessKey
const parseStampToFormat = require("./datetime").parseStampToFormat
let smsClient = new SMSClient({accessKeyId , secretAccessKey})

/* 发送验证码 */
function sendSMS(phoneNumber , code , type) {

    return new Promise((resolve ,reject) => {
        smsClient.sendSMS({
            PhoneNumbers: phoneNumber,
            SignName: '瞄日记',
            TemplateCode: 'SMS_149386127',
            TemplateParam: JSON.stringify({code : code ,type: type})
        }).then(function(res){
            console.log("短信发送成功:" + res)
            resolve(res)
        },function(err){
            console.log("短信发送失败:" + err)
            reject(err)
        })
    })
}
/* 校验验证码 返回最近的验证码 */
function queryCode(phoneNumber){
    return new Promise((resolve , reject) => {
        let timestamp = new Date().getTime()
        let nowDatetime = parseStampToFormat( timestamp ,'YYYYMMDD')    
        smsClient.queryDetail({
            PhoneNumber: phoneNumber,
            SendDate: "20181029",//查询时间
            PageSize: '1',
            CurrentPage: "1"
        }).then(function (res) {
            let {Code, SmsSendDetailDTOs}=res
            if (Code === 'OK' && SmsSendDetailDTOs.SmsSendDetailDTO.length > 0) {
                //处理发送详情内容
                console.log(SmsSendDetailDTOs)
                let item = SmsSendDetailDTOs.SmsSendDetailDTO[0]
                let receiveDate = item.ReceiveDate
                let content = item.Content
                let code = content.slice(17, 23)
                console.log('\n+++++++++' + code + "\n")
                resolve(code)
            }else{
                reject(new Error('查询没有验证码'))
            }
        }, function (err) {
            //处理错误
            console.log(err)
            reject(err)
        })
    })
}

/* 随机产生六位数验证码 */
function getRandomCode(){
    var range=function(start,end){
        var array=[];
        for(var i=start;i<end;++i) array.push(i);
        return array;
    };
    var randomstr = range(0,6).map(function(x){
            return Math.floor(Math.random()*10);
        }).join('');
    console.log(randomstr);
    return randomstr
}


module.exports = {
    sendSMS,
    getRandomCode,
    queryCode
}