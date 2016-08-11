const LocalStrategy   = require('passport-local').Strategy;
const bcrypt   = require('bcrypt-nodejs');

const login = require('./login');
const signup = require('./signup');
const UserRepository = require('../repositories/User.repository');
const User = require('../models/User.model');

const userRepository = new UserRepository();

const generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = password => {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = passport => {

    passport.serializeUser((user, done) => {
        console.log("USER ID: " + user.id);
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        userRepository.findById(id).then(user => {
            console.log("USER: " + user.dataValues);
            done(null, user.dataValues);
        }).catch(error => {
            console.error("ERORR" + error);
            done(error);
        });
    });

    // Sign Up Strategy
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        }, (req, email, password, done) => {

        process.nextTick(() => {
            userRepository.findByEmail(email).then(user => {
                if(user) {
                    return done(null, false, 
                        req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    let newUser = new User(1, email, req.body.name,
                        generateHash(password), null, 0, 1);

                    userRepository.add(newUser).then(newUser => {
                        done(null, newUser);
                    }).catch(error => {
                        console.error("ERROR: " + error);
                        done(error);
                    });
                }
            }).catch(error => {
                return done(error);
            });
        });
    }));

};
