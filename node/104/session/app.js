var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

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

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/', (req, res, next) => {
  res.locals.name = req.session.name ?? '';
  let hits = req.session.hits ?? 0;
  hits++;
  res.locals.hits = hits;
  req.session.hits = res.locals.hits;
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
      req.session.name = res.locals.name;
      // } else {
      //   res.locals.name = req.cookies.name ?? 'user';
    }
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
