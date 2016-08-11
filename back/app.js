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
const flash = require('connect-flash');

const io = require('./sockets').listen(http);
const db = require('./repositories');

const home = require('./controllers/Home.controller');
const guessWord = require('./controllers/GuessWordApp.controller');
const signup = require('./controllers/Signup.controller');
const login = require('./controllers/Login.controller');
const logout = require('./controllers/Logout.controller');
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passport')(passport);

app.use('/', home);
app.use('/guess-word', guessWord);
app.use('/signup', signup(passport));
app.use('/login', login);
app.use('/logout', logout);

app.use(error.clientError);
app.use(error.serverError);

// Drop force property in production mode
db.sync({force: true}).then(_=> {

  const Word = require('./models/Word.model');
  const WordRepository = require('./repositories/Word.repository');
  const wordRepository = new WordRepository();

  // Drop in production mode
  const words = [
    new Word(1, 'cat', 'images/words/cat.jpg', 'Some random hint'),
    new Word(2, 'bird', 'images/words/bird.jpg', 'Some random hint'),
    new Word(3, 'many', 'images/words/many.jpg', 'Some random hint'),
    new Word(4, 'words', 'images/words/words.jpg', 'Some random hint'),
    new Word(5, 'work', 'images/words/work.jpg', 'Some random hint'),
    new Word(6, 'add', 'images/words/add.png', 'Some random hint'),
    new Word(7, 'agree', 'images/words/agree.png', 'Some random hint'),
    new Word(8, 'approve', 'images/words/approve.png', 'Some random hint'),
    new Word(9, 'break', 'images/words/break.jpg', 'Some random hint'),
    new Word(10, 'calculate', 'images/words/calculate.jpg', 'Some random hint'),
    new Word(11, 'choose', 'images/words/choose.jpg', 'Some random hint'),
    new Word(12, 'compare', 'images/words/compare.png', 'Some random hint'),
    new Word(13, 'compete', 'images/words/compete.jpg', 'Some random hint'),
    new Word(14, 'contain', 'images/words/contain.jpg', 'Some random hint'),
    new Word(15, 'create', 'images/words/create.jpg', 'Some random hint'),
    new Word(16, 'deliver', 'images/words/deliver.png', 'Some random hint'),
    new Word(17, 'different', 'images/words/different.jpg', 'Some random hint'),
    new Word(18, 'earn', 'images/words/earn.jpg', 'Some random hint'),
    new Word(19, 'enter', 'images/words/enter.jpg', 'Some random hint'),
    new Word(20, 'explore', 'images/words/explore.jpg', 'Some random hint')
  ];

  wordRepository.addAll(words);
  // END

  http.listen(app.get('port'), app.get('ip'), _=> {
    log.info("Server listening at %s:%d ", app.get('ip'), app.get('port'));
  });

});
