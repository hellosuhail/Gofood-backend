const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    _id:Number,
    name: String,
    price: Number,
    image: String,
    });
module.exports = mongoose.model('Data', cardSchema, 'data');