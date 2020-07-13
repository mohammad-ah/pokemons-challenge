/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

const cors = require('cors');


/**
 * Routing Module Dependencies.
 */
const adminRouter = require('./routes/admin');

/**
 * Express Module.
 */
const app = express();


app.use(cors());

/**
 * Express Dep usage
 */
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'node_modules', 'public')));

/**
 * Routing
 */
app.use('/pokemon', adminRouter);

/**
 * error handling
 */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
  // res.render('error');
});


/**
 * Export Express App
 */
module.exports = app;
