const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  Name: String,
  number: Number,
  address: String,
  email: String,
});

module.exports = mongoose.model('Order', orderSchema);


const loginSchema= new mongoose.Schema({
    email:String,
    password:String

}) 

module.exports = mongoose.model('Login',loginSchema)