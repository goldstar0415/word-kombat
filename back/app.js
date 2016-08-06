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
const io = require('./sockets').listen(http);

const db = require('./repositories');

const home = require('./controllers/Home.controller');
const guessWord = require('./controllers/GuessWordApp.controller');
// const signup = require('./controllers/signup');
// const login = require('./controllers/login');
// const logout = require('./controllers/logout');
const error = require('./controllers/Error.controller');

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
app.use('/guess-word', guessWord);
// app.use('/signup', signup);
// app.use('/login', login);  
// app.use('/logout', logout);

app.use(error.clientError);
app.use(error.serverError);

// Drop force property in production mode
db.sync({force: true}).then(_=> {

  http.listen(app.get('port'), app.get('ip'), _=> {
    log.info("Server listening at %s:%d ", app.get('ip'), app.get('port'));
  });

});
