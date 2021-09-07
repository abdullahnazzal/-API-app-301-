'use strict'
const mongoose =require('mongoose');

const ChocolateSchema = new mongoose.Schema({
    name: String,
    img:String,
    email: String
  });

const ChocolateModel = mongoose.model('Chocolate', ChocolateSchema);

module.exports=ChocolateModel;

