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

const validPassword = (password1, password2) => {
    return bcrypt.compareSync(password1, password2);
};

module.exports = passport => {

    passport.serializeUser((user, done) => {
        console.log("USER ID: " + user.id);
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        userRepository.findById(id).then(user => {
            console.log("USER: " + JSON.stringify(user.dataValues));
            done(null, user.dataValues);
        }).catch(error => {
            console.error("ERORR" + error);
            done(error);
        });
    });

    // Sign Up Local Strategy
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
                        console.log("NEW USER: " + newUser);
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

    // Log In Local Strategy
    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {

            userRepository.findByEmail(email).then(user => {
                if (!user) {
                    console.log("TWO");
                    return done(null, false,
                        req.flash('loginMessage', 'No user found.'));
                }

                if (!validPassword(password, user.dataValues.password)) {
                    return done(null, false,
                        req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            }).catch(error => {
                console.error("ERROR: " + error);
                done(error);
            });
        }));

};
