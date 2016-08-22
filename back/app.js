const path = require('path');
const httpLogger = require('morgan');
const log = require('./logger');
const config = require('./config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')(config.get('session'));
const http = require('http').Server(app);

const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const flash = require('connect-flash');

const io = require('./sockets');
const db = require('./repositories');

const home = require('./controllers/Home.controller');
const guessWord = require('./controllers/GuessWordApp.controller');
const signup = require('./controllers/Signup.controller');
const login = require('./controllers/Login.controller');
const logout = require('./controllers/Logout.controller');
const error = require('./controllers/Error.controller');
const leaderboards = require('./controllers/Leaderboards.controller');

app.use(httpLogger('dev'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../front/dist/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', config.get('port'));
app.set('ip', config.get('host'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passport')(passport);

io.listen(http, session);

app.use('/', home);
app.use('/guess-word', guessWord);
app.use('/guess-word/leaderboards', leaderboards);
app.use('/signup', signup(passport));
app.use('/login', login(passport));
app.use('/logout', logout);

app.use(error.clientError);
app.use(error.serverError);

db.sync().then(_=> {

  http.listen(app.get('port'), app.get('ip'), _=> {
    log.info("Server listening at %s:%d ", app.get('ip'), app.get('port'));
  });

});
