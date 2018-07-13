var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");
var BookModule = require('./books')

//models/index.js
module.exports.Book = BookModule;
