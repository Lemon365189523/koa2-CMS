const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleModel = new Schema({
    id : {type : Number, required: true},
    userId : {type: String},
    contentTypeId : {type: Number},
    createdAt :  { type: Date, default: Date.now }, 
    updateAt:{type: Date, default: Date.now},
    categoryId : {type : Number},
    tags : {type : Array},
    images : {type : Object}, //{"1" , "image1" , "2" : "image2"}
    location : {type : String},
    content : {type : String}
});


const articleModel = mongoose.model('MDArticleModel', ArticleModel)

module.exports = articleModel