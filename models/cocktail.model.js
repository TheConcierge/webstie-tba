const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let LiquorSchema = new Schema({
    type: String,
    brand: String,
    amount: String
});

let IngredientSchema = new Schema({
    type: String,
    brand: String,
    amount: String
});

let GarnishSchema = new Schema({
    type: String,
    amount: String
});

let InstructionSchema = new Schema({
    number: Number,
    instruction: String
});

let CocktailSchema = new Schema({
    liquors: [LiquorSchema],
    ingredients: [IngredientSchema],
    garnishes: [GarnishSchema],
    instructions: [InstructionSchema]
});

module.exports =  CocktailSchema;
