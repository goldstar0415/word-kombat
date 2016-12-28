const config = require('../config');
const userRepository = new (require('../repositories/user.repository'))();

module.exports = passport => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userRepository.findById(id).then(user => {
      done(null, user);
    }).catch(error => {
      done(error);
    });
  });

};
