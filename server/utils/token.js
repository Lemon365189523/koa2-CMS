const jsonwebtoken = require('jsonwebtoken')

class TokenTool {

    async checkToken(token){
        return Promise((resolve, reject) => {
            jsonwebtoken.verify(token, "mewDiary",function(err, decode){
                if (err == null && decoded.exp - Date.now()/1000 >= 0) {
                    //验证通过
                    resolve(true)
                }else {
                    //验证失败
                    resolve(false)
                }

            })
        })

    }

    async createToken(user) {
        let token = jsonwebtoken.sign({
            data: user,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
            }, "mewDiary");
        return token
    }

}

module.exports = new TokenTool()