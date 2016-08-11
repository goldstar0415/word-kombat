const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const User = require('../models/User.model');
const UserRepository = require('../repositories/User.repository');
const userRepository = new UserRepository();

module.exports = passport => {

  passport.use('signup', new LocalStrategy({ passReqToCallback : true },
    function(req, username, password, done) {

      console.log("AAA");

      findOrCreateUser = () => {
        User.findByUsername(username).then(user => {
          if(user) {
            console.log('User already exists with username: ' + username);
            return done(null, false);
          } else {
            console.log("AAAAAAAAAAAAAAA");
            let newUser = new User(0, req.param('email'), username,
              createHash(password), null, 0, 1);

            userRepository.add(newUser).then(() => {
              console.log("DONE");
              done(null, newUser);
            }).catch(error => {
              console.log("ERROR 1");
              done(error);
            });
          }
        }).catch(error => { 
          console.log("ERROR 2");
          done(error)
        });
      
      }

      process.nextTick(findOrCreateUser);
    }));

    // Generates hash using bCrypt
    const createHash = password => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}