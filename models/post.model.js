const mongoose = require('mongoose');
CocktailSchema = require('./cocktail.model');
ArticleSchema = require('./article.model');
mongoose.set('debug', true);
const Schema = mongoose.Schema;


let Post = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    img_location: {
        type: String
    },
    tagline: {
        type: String
    },
    custom_id: {
        type: String
    },
    category: {
        type: String,
        enum: ['articles', 'cocktails']
    },
    cocktail: {
        type: CocktailSchema
    },
    article: {
        type: ArticleSchema
    }
}, {
    timestamps : {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports =  mongoose.model('Post', Post);
