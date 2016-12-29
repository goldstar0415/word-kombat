const socketio = require('socket.io');

const log = require('../logger');

const wordRepository = new (require('../repositories/word.repository'))();
const userRepository = new (require('../repositories/user.repository'))();

const Message = require('../models/message.model');
const User = require('../models/user.model');
const Word = require('../models/word.model');

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

module.exports.listen = (app, session) => {
  const io = socketio.listen(app);

  let users = [];
  let words = [];

  io.on('connection', socket => {

    let userId;

/*    if(!!socket.handshake.session.passport) {
      userId = socket.handshake.session.passport.user;
      log.info(userId);

      userRepository.findById(userId).then(user => {
        users.push(user);
        io.emit('user-connected', users);
      }).catch(error => {
        log.warn(error);
      });

    } else {
*/    let user = new User(1, null, 'guest' + users.length,
        null, 'images/users/noIco.png', 0, 1);
      users.push(user);
      io.emit('user-connected', users.map(user => user.values));
    // }

    if (words.length > 0) {
      io.emit('word', words[0]);
    } else {
      getWords(words, io, 10).then(retraivedWords => words = retraivedWords);
    }

    socket.on('new-message', message => {
      console.log("MESSAGE", JSON.stringify(message));

      if(!!socket.handshake.session.passport) {
        message.user = users.filter(user => user.id === userId)[0];
      }


      if (words.length > 0) {
        if (message.text.toLowerCase() === words[0].value.toLowerCase()) {
          message.points = words[0].value.length;

          if(!!socket.handshake.session.passport) {
            userRepository.findById(userId).then(user => {
              user.score += message.points;
              user.save();
              
              for(let u of users) {
                if(u.id === userId) {
                  u.score = user.score;
                }
              }

              io.emit('user-connected', users);
            });
          }
          
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
      
      io.emit('message', message);

    });

    socket.on('disconnect', () => {
      users = [];
      io.emit('user-connected', []);
      log.info('SOCKET DISCONNECT');
    });

  });
}