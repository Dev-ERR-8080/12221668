const mongoose = require('mongoose')


const urlSchema = new mongoose.Schema({
    url : {type : String ,required :true },
    validity : {type : Number },
    shortCode : {type : String , unique: true} ,
    createdAt:{type:Date , default:Date.now}
});

const ShortUrls = mongoose.model('ShortUrls',urlSchema);

module.exports = ShortUrls;
