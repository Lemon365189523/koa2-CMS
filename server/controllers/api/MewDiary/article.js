const ArticleModel = require('../../../models/MewDiary/articleModel')
const SequenceModel = require('../../../models/MewDiary/sequenceModel')

class ArticleController {

    async addArticle(ctx){
        console.log('添加文章')
        var test = new SequenceModel({id: 'test'})
        console.log(test)
        test.getNextSequenceValue('test')

    }

    async removeArticle(ctx){

        
    }

}


module.exports = new ArticleController()