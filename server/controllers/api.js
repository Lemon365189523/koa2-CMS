
class ApiController {

    constructor(){

    }

    async loginAction(req, res, next){
        console.log('====================================');
        console.log(req);
        console.log('====================================');
    }
    
    async registerAction(ctx){
        console.log('====================================');
        console.log( ctx);
        console.log('====================================');
    }

}

module.exports = new  ApiController();