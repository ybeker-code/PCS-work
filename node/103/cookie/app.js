var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  // if (req.url === '/favicon.ico') {
  //   return next();
  // }

  res.locals.name = req.cookies.name ?? 'user';

  // res.locals.hits = req.cookies.hits ?? 0;
  // res.locals.hits++;
  let hits = req.cookies.hits ?? 0;
  hits = Number(hits) + 1;
  res.locals.hits = hits;
  res.cookie('hits', hits, {
    maxAge: 60000
  })
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.route('/form')
  .get(function (req, res, next) {
    res.render('index', {
      title: 'Express',
      partials: {
        content: 'form'
      }
    });
  })
  .post(function (req, res, next) {
    if (req.body.name) {
      res.locals.name = req.body.name;
      // } else {
      //   res.locals.name = req.cookies.name ?? 'user';
    }
    res.cookie('name', res.locals.name, {
      maxAge: 60000
    });
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
