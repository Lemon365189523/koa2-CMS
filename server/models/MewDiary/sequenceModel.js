const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SequenceModel = new Schema({
    id : {type : String, required : true},
    sequence_value : {type : Number, default : 1}
})

const sequence = mongoose.model('sequence', SequenceModel);

SequenceModel.methods.getNextSequenceValue = async function(sequenceName){
    let doc = await sequence.find({id : sequenceName})
    console.log(doc)
}

SequenceModel.static.findByName = function(name, cb){
    console.log("findByName")
}

module.exports = sequence 