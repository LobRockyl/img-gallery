const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const config = require('dotenv').config();
const connectDB = require('./config/database');
var cors = require('cors')


//database connection

connectDB();

// Init App
const app = express();

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
//cors
app.use(cors())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Route Files
let articles = require('./routes/articles');
app.use('/', articles);

module.exports={app}

