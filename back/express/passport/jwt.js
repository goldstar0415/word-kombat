let passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const userRepository = new (require('../repositories/user.repository'))();

let opts = {}

opts.jwtFromRequest = req => {
  if(req.headers.authorization) {
    return req.headers.authorization;
  } else if(req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

opts.secretOrKey = config.get('jwt:secret');

passport.use(new JwtStrategy(opts, (payload, done) => {

  userRepository.findById(payload.id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(error => {
      return done(error, false);
    });

}));

passport.jwtSettings = {
  session: false,
  failWithError: true
};

module.exports = passport;