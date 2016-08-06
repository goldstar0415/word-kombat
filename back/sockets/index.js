const socketio = require('socket.io');

const log = require('../logger');

const Message = require('../models/Message.model');
const User = require('../models/User.model');
const Word = require('../models/Word.model');


const DUMMY_WORDS = [
  // new Word(1, 'cat', 'images/words/cat.jpg', 'Some random hint'),
  // new Word(2, 'bird', 'images/words/bird.jpg', 'Some random hint'),
  new Word(3, 'many', 'images/words/many.jpg', 'Some random hint'),
  new Word(4, 'words', 'images/words/words.jpg', 'Some random hint'),
  new Word(5, 'work', 'images/words/work.jpg', 'Some random hint')
];

module.exports.listen = app => {
  const io = socketio.listen(app);

  let users = [];
  let words = DUMMY_WORDS.slice();

  io.on('connection', socket => {

    let user = new User(1, 'random@email.com', 'guest' + users.length,
      null, 'images/users/noIco.png', 200, 5);
    users.push(user);

    log.info("CLIENTS: " + Object.keys(io.engine.clients).length);

    io.emit('user-connected', users.map(user => user.values));

    if(words.length > 0) {
      if(Object.keys(io.engine.clients).length <= 1) {
        log.info("EMMIT FIRST WORD");
        io.emit('word', words[0].values);
      }
    } else {
      words = DUMMY_WORDS.slice();
    }

/*    let interval = setInterval(() => {
      if(words.length > 0) {
        io.emit('word', words[0].values);
        words.shift();
        console.log("EMIIT IN INTERVAL");
      } else {
        words = DUMMY_WORDS.slice();
      }
    }, 30000);*/

    socket.on('new-message', message => {
      io.emit('message', message);
      if(words.length > 0) {
        if(message.text.toLowerCase() === words[0]._value.toLowerCase()) {
            // clearInterval(interval);
            words.shift();
            if(words.length > 0) {
              io.emit('word', words[0].values);
            } else {
              words = DUMMY_WORDS.slice();
              io.emit('word', words[0].values);
            }
        }
      } else {
        words = DUMMY_WORDS.slice();
      }
    });

    socket.on('disconnect', () => {
      users = [];
      log.info('SOCKET DISCONNECT');
    });

  });

}