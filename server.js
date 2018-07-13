// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var db = require('./models');
//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////



var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// server.js
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  for(var i=0; i < books.length; i++) {
    if (books[i]._id === req.params.id) {
      res.json(books[i]);
      break; // we found the right book, we can stop searching
    }
  }
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  var newBook = req.body;
  newBook._id = newBookUUID++;
  books.push(newBook);
  res.json(newBook);
});

// update book
app.put("/api/books/:id", function(req, res) {
 let bookId = req.params.id;
 let updateBody = req.body;
 db.Book.findOneAndUpdate({ _id: bookId }, updateBody, { new: true }, function(
   err,
   updatedBook
 ) {
   if (err) {
     console.log(err);
     res.sendStatus(500);
   }
   res.json(updatedBook);
 });
});



// delete book
app.delete("/api/books/:id", function(req, res) {
 // get book id from url params (`req.params`)
 let bookIndex = req.params.id;
 db.Book.findOneAndRemove({ _id: bookIndex }, function(err, updatedBooks) {
   if (err) {
     console.log(err);
     res.sendStatus(500);
   }
   res.json(updatedBooks);
 });





app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
