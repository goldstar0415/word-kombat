const socketio = require('socket.io');

const log = require('../logger');

const WordRepository = require('../repositories/Word.repository');
const wordRepository = new WordRepository();

const Message = require('../models/Message.model');
const User = require('../models/User.model');
const Word = require('../models/Word.model');

module.exports.listen = app => {
  const io = socketio.listen(app);
  let users = [];

  wordRepository.getRandomWords(10).then(retraivedWords => {

    let words = retraivedWords.map(word => {
      let letters = shuffleLetters(word.value);
      return {
        id: word.id,
        value: word.value,
        letters: letters,
        image: word.image,
        hint: word.hint
      };
    });

    io.on('connection', socket => {
      
      let user = new User(1, null, 'guest' + users.length,
        null, 'images/users/noIco.png', 0, 1);

      users.push(user);

      io.emit('user-connected', users.map(user => user.values));

      if(words.length > 0) {
        if(Object.keys(io.engine.clients).length <= 1) {
          io.emit('word', words[0]);
        }
      } else {
        wordRepositoy.getRandomWords(10).then(retraivedWords => {
          console.log("WORDS ENDS");
          let words = retraivedWords.map(word => {
            let letters = shuffleLetters(word.value);
            return {
              id: word.id,
              value: word.value,
              letters: letters,
              image: word.image,
              hint: word.hint
            };
          });
        });
      }

      socket.on('new-message', message => {
        io.emit('message', message);
        if(words.length > 0) {
          if(message.text.toLowerCase() === words[0].value.toLowerCase()) {
              log.info("WORD: " + words[0].value);
              words.shift();
              if(words.length > 0) {
                io.emit('word', words[0]);
              } else {
                wordRepository.getRandomWords(10).then(retraivedWords => {
                  log.info("WORDS ENDS 2");
                  words = retraivedWords.map(word => {
                    let letters = shuffleLetters(word.value);
                    return {
                      id: word.id,
                      value: word.value,
                      letters: letters,
                      image: word.image,
                      hint: word.hint
                    };
                  });
                  io.emit('word', words[0]);
                });
              }
          }
        } else {
          wordRepository.getRandomWords(10).then(retraivedWords => {
            log.info("WORDS ENDS 3");
            words = retraivedWords.map(word => {
              let letters = shuffleLetters(word.value);
              return {
                id: word.id,
                value: word.value,
                letters: letters,
                image: word.image,
                hint: word.hint
              };
            });
            io.emit('word', words[0]);
          });
        }
      });

      socket.on('disconnect', () => {
        users = [];
        log.info('SOCKET DISCONNECT');
      });

    });

  });

}

const shuffleLetters = word => {
  let letters = word.split('');
  let currentIndex = letters.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = letters[currentIndex];
    letters[currentIndex] = letters[randomIndex];
    letters[randomIndex] = temporaryValue;
  }

  return letters;
}