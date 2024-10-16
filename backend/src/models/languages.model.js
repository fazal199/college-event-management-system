const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  languagename: { type: String, required: true }
},{timestamps: true});

const LanguageModel = mongoose.model('Language', LanguageSchema); 

module.exports = LanguageModel
