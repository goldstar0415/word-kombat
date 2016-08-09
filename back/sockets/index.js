const socketio = require('socket.io');

const log = require('../logger');

const WordRepository = require('../repositories/Word.repository');
const wordRepository = new WordRepository();

const Message = require('../models/Message.model');
const User = require('../models/User.model');
const Word = require('../models/Word.model');

const shuffle = require('../util/shuffle');

const getWords = (words, io, amount) => {
  return wordRepository.getRandomWords(amount).then(retraivedWords => {

    words = retraivedWords.map(word => {
      let letters = shuffle(word.value);
      return {
        id: word.id,
        value: word.value,
        letters: letters,
        image: word.image,
        hint: word.hint
      };
    });

    io.emit('word', words[0]);

    return words;
  });
};

module.exports.listen = app => {
  const io = socketio.listen(app);
  let users = [];
  let words = [];

  io.on('connection', socket => {

    let user = new User(1, null, 'guest' + users.length,
      null, 'images/users/noIco.png', 0, 1);

    users.push(user);

    io.emit('user-connected', users.map(user => user.values));

    if (words.length > 0) {
      io.emit('word', words[0]);
    } else {
      getWords(words, io, 10).then(retraivedWords => words = retraivedWords);
    }

    socket.on('new-message', message => {
      io.emit('message', message);

      if (words.length > 0) {
        if (message.text.toLowerCase() === words[0].value.toLowerCase()) {
          words.shift();
          if (words.length > 0) {
            io.emit('word', words[0]);
          } else {
            getWords(words, io, 10);
          }
        }
      } else {
        getWords(words, io, 10);
      }
      
    });

    socket.on('disconnect', () => {
      users = [];
      io.emit('user-connected', []);
      log.info('SOCKET DISCONNECT');
    });

  });
}