const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const wordRouter = require("./routes/word/index")
const {mongo} = require("mongoose");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/words', wordRouter);

const db = require("./config/mongo").mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

module.exports = app;

const port = 5000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`)
})