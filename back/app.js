const path = require('path');

const express = require('express');
const app = express();

// const loger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session')({
  secret: "1111",
  resave: true,
  saveUninitialized: true
});

const http = require('http').Server(app);

const home = require('./controllers/home');
// const chat = require('./controllers/chat');
// const signup = require('./controllers/signup');
// const login = require('./controllers/login');
// const logout = require('./controllers/logout');

//app.use(loger('dev'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../front/dist/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(session);

app.use('/', home);
// app.use('/chat', chat);
// app.use('/signup', signup);
// app.use('/login', login);
// app.use('/logout', logout);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
    app.use((err, req, res, next) => {
    res.status(err.status || 500);
    let errorTemplate = 'error-';
    if(err.status === 404)
      errorTemplate += 404;
    else
      errorTemplate += 500;
    res.render(errorTemplate);
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(app.get('port'), app.get('ip'), _=> {
  console.log("Server listening at %s:%d ", app.get('ip'),app.get('port'));
});