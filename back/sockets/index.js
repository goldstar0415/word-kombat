const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');

const config = require('../config');
const log = require('../logger');

const wordRepository = new (require('../repositories/word.repository'))();
const userRepository = new (require('../repositories/user.repository'))();

const Message = require('../models/message.model');
const User = require('../models/user.model');
const Word = require('../models/word.model');

const shuffle = require('../util/shuffle');

module.exports.listen = app => {
  const io = socketio.listen(app);

  let amountOfGuests = 0;
  let users = [];
  let words = [];

  io.use(socketioJwt.authorize({
    secret: config.get('jwt:secret'),
    handshake: true,
    fail: (error, data, accept) => {
      if (data.request) {
        accept(null);
      } else {
        accept(null, false);
      }
    }
  }));

  io.on('connection', socket => {

    if(!!socket.decoded_token) {
      let userId = socket.decoded_token.id;

      userRepository.findById(userId).then(user => {
        users.push(user);
        io.emit('user-connected', users);
        socket.handshake.user = user;
      }).catch(error => {
        log.warn(error);
      });
    } else {
      amountOfGuests++;
      let user = new User(null, null, 'guest' + amountOfGuests,
        null, 'http://www.robohash.org/' + amountOfGuests, 0, 1);
      users.push(user);
      socket.handshake.user = user;
      io.emit('user-connected', users);
    }

    if(words.length > 0) {
      io.emit('word', {
        word: words[0],
        index: 11 - words.length
      });
    } else {
      getWords(io, 10).then(fetchedWords => words = fetchedWords);
    }

    socket.on('new-message', message => {
      let user = socket.handshake.user;

      if(user) {
        if (words.length > 0) {
          if (message.text.toLowerCase() === words[0].value.toLowerCase()) {
            message.points = calculateScore(words[0]);
            words.shift();
            if (words.length > 0) {
              io.emit('word', {
                word: words[0],
                index: 11 - words.length
              });
            } else {
              getWords(io, 10).then(fetchedWords => words = fetchedWords);
            }
          }
        } else {
          getWords(io, 10).then(fetchedWords => words = fetchedWords);
        }

        user.score += message.points;

        users.forEach(u => {
          if(u.name === user.name) {
            u.score = user.score;
          }
        });

        message.user = user;

        io.emit('user-connected', users);
        io.emit('message', message);

        if(user.id) {
          userRepository.update(user.id, user);
        }
      }

    });

    socket.on('disconnect', () => {
      if(!!socket.handshake.user) {
        users = users.filter(user => user.name !== socket.handshake.user.name)
        io.emit('user-connected', users);
      }
    });

  });
}

function calculateScore(word) {
  return word.value.length;
}

function getWords(io, amount) {
  return wordRepository.getRandomWords(amount)
    .then(words => {
      words = words.map(word => {
        let letters = shuffle(word.value);
        return {
          id: word.id,
          value: word.value,
          letters: letters,
          image: word.image,
          hint: word.hint
        };
      });
      io.emit('word', {
        word: words[0],
        index: 1
      });
      return words;
    })
    .catch(error => {
      log.error(error);
    });
};