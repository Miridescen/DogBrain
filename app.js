var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/admin/create');
var articalRouter = require('./routes/artical');
var adminRouter = require('./routes/admin/admin');
var adminCategoryRouter = require('./routes/admin/category');
var adminArticalRouter = require('./routes/admin/artical');

var app = express();


var ejs = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");//   http://www.yueyanshaosun.cn,http://www.baidu.com,www,...
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Origin,Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    // else next();
    next();
});

app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/users', usersRouter);
app.use('/artical', articalRouter);
app.use("/admin", adminRouter);
app.use("/admin/category", adminCategoryRouter);
app.use("/admin/artical", adminArticalRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
