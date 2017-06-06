const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');

const config = require('../config');
const log = require('../logger');

const wordRepository = new (require('../repositories/word.repository'))();
const userRepository = new (require('../repositories/user.repository'))();

const Message = require('../models/message.model');
const User = require('../models/user.model');
const Word = require('../models/word.model');
const Rank = require('../models/rank.model');

const shuffle = require('../util/shuffle');

module.exports.listen = app => {
  const io = socketio.listen(app);

  const amountOfWordsInMatch = 3;
  let amountOfGuests = 0;
  let users = [];
  let words = [];
  let scores = [];

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

    if(Boolean(socket["decoded_token"])) {
      let userId = socket["decoded_token"].id;

      userRepository.findById(userId).then(user => {
        users.push(user);
        scores.push({user: user, points: 0, words: 0});
        io.emit('user-connected', users);
        io.emit('scores', scores);
        socket.handshake.user = user;
      }).catch(error => {
        log.warn(error);
      });
    } else {
      amountOfGuests++;
      let user = createGuest(amountOfGuests);
      users.push(user);
      scores.push({user: user, points: 0, words: 0});
      socket.handshake.user = user;
      io.emit('user-connected', users);
      io.emit('scores', scores);
    }

    if(words.length > 0) {
      io.emit('word', {
        word: words[0],
        index: amountOfWordsInMatch + 1 - words.length
      });
    } else {
      getWords(io, amountOfWordsInMatch).then(fetchedWords => {
        words = fetchedWords
      });
    }

    socket.on('message', message => {
      let user = socket.handshake.user;

      if(user) {
        if (words.length > 0) {
          if (message.text.toLowerCase() === words[0].value.toLowerCase()) {
            message.points = calculateScore(words[0]);
            words.shift();
            scores.forEach(score => {
              if(score.user.name === user.name) {
                score.points += message.points;
                score.words++;
              }
            });
            if (words.length > 0) {
              io.emit('word', {
                word: words[0],
                index: amountOfWordsInMatch + 1 - words.length
              });
            } else {
              io.emit('end-of-match', scores);
              scores.forEach(score => {
                score.words = 0;
                score.points = 0;
              });
              getWords(io, amountOfWordsInMatch).then(fetchedWords => {
                words = fetchedWords;
              });
            }
          }
        } else {
          getWords(io, amountOfWordsInMatch).then(fetchedWords => {
            words = fetchedWords;
          });
        }

        user.score += message.points;

        users.forEach(u => {
          if(u.name === user.name) {
            u.score = user.score;
          }
        });

        message.user = user;

        io.emit('user-connected', users);
        io.emit('scores', scores);
        io.emit('message', message);

        if(user.id) {
          userRepository.update(user.id, user);
        }
      }

    });

    socket.on('disconnect', () => {
      if(Boolean(socket.handshake.user)) {
        users = users.filter(user => user.name !== socket.handshake.user.name);
        scores = scores.filter(score => score.user.name !== socket.handshake.user.name);
        io.emit('user-connected', users);
        io.emit('scores', scores);
      }
      if(users.length <= 0) {
        words = [];
        amountOfGuests = 0;
      }
    });

  });
}

function createGuest(index) {
  return new User(
    null, null, 'guest' + index,
    null, 'http://www.robohash.org/' + index, 0,
    new Rank(1, 1, 0, 'assets/images/ranks/1.png'));
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