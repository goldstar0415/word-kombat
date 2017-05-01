const path = require('path');
const httpLogger = require('morgan');
const log = require('./logger');
const config = require('./config');
const passport = require('passport');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);

const io = require('./sockets');
const db = require('./repositories');

const indexController = require('./controllers/index.controller');
const errorController = require('./controllers/error.controller');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const leaderboardsController = require('./controllers/leaderboards.controller');
const rankController = require('./controllers/rank.controller');

const corsFilter = require('./filters/cors.filter');

app.use(passport.initialize());
app.use(httpLogger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', config.get('port'));
app.set('ip', config.get('host'));

app.use(corsFilter);
io.listen(http);

app.use('/', indexController);
app.use('/api/users', userController);
app.use('/api/leaderboards', leaderboardsController);
app.use('/api/ranks', rankController);
app.use('/api/auth', authController);

app.use(express.static(path.join(__dirname, '../front/dist/')));

app.use(errorController.clientError);
app.use(errorController.serverError);

db.sync().then(_=> {

  http.listen(app.get('port'), app.get('ip'), _=> {
    log.info("Server listening at %s:%d ", app.get('ip'), app.get('port'));
  });

});

module.exports = app;