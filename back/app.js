const path = require('path');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const httpLogger = require('morgan');
const log = require('./logger');
const config = require('./config');

const session = require('express-session')(config.get('session'));

const http = require('http').Server(app);

const home = require('./controllers/home');
// const chat = require('./controllers/chat');
// const signup = require('./controllers/signup');
// const login = require('./controllers/login');
// const logout = require('./controllers/logout');
const error = require('./controllers/error');

log.debug("SHit happens", {shit: "random staff"});

app.use(httpLogger('dev'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../front/dist/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', config.get('port'));
app.set('ip', config.get('host'));

app.use(session);

app.use('/', home);
// app.use('/chat', chat);
// app.use('/signup', signup);
// app.use('/login', login);  
// app.use('/logout', logout);

app.use(error[0]);
app.use(error[1]);

http.listen(app.get('port'), app.get('ip'), () => {
  log.info("Server listening at %s:%d ", app.get('ip'), app.get('port'));
});