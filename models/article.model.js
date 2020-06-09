const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ParagraphSchema = new Schema({
    type: String,
    text: String
});

let ArticleSchema = new Schema({
    paragraphs: [ParagraphSchema]
});

module.exports = ArticleSchema;
