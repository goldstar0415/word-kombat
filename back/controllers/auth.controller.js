const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

const log = require('../logger');
const userRepository = new (require('../repositories/user.repository'))();

/**
 * @api {post} /api/auth Login
 * @apiName login 
 * @apiGroup Auth 
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {JWT} jwt Token.
 * @apiError InvalidEmail Email is invalid.
 * @apiError InvalidPassword Password is invalid.
 * @apiError UserNotFound User with this email not found.
*/
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if(!isEmailValid(email, res)) return;
  if(!isPasswordValid(password, res)) return;

  userRepository.findByEmail(email)
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "User with this email not found",
          target: "email"
        });
      } else if(passwordHash.verify(password, user.password)) {
        sendToken(user, "Signed In successfuly", res);
      } else {
        return res.status(403).send({
          message: "Invalid password",
          target: "password"
        });
      }
    }).catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {post} api/auth/signup Signup 
 * @apiName signup 
 * @apiGroup Auth
 *
 * @apiParam {String} first_name First name of the User.
 * @apiParam {String} second_name Second name of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} phone Phone number of the User.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {JWT} jwt Token.
 * @apiError InvalidEmail Email is invalid.
 * @apiError InvalidFirstName First Name is invalid.
 * @apiError InvalidSecondName Second Name is invalid.
 * @apiError InvalidPassword Password is invalid.
 * @apiError UserAlreadyExists User with this email already exists.
*/
router.post('/signup', (req, res) => {

  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  if(!isEmailValid(email, res)) return;
  if(!isUsernameValid(username, res)) return;
  if(!isPasswordValid(password, res)) return;

  userRepository.findByEmail(email).then(user => {

    if(!!user) {
      return res.status(406).send({
        message: "User with this email already exists",
        target: "email"
      });
    }

    userRepository.findByName(username).then(user => {
      if(!!user) {
        return res.status(406).send({
          message: "User with this name already exists",
          target: "username"
        });
      }
      let newUser = {
        email: email,
        name: username,
        password: passwordHash.generate(password),
        icon: 'https://robohash.org/' + username,
        score: 0
      }

      userRepository.add(newUser)
        .then(_=> {
          return userRepository.findByEmail(email);
        })
        .then(user => {
          sendToken(user, "Signed Up successfuly", res);
        })
        .catch(error => {
          log.error(error);
          return res.json(error);
        });
    }).catch(error => {
      log.error(error);
      return res.json(error);
    });
  }).catch(error => {
    log.error(error);
    return res.json(error);
  });
});

/**
 * @api {post} api/auth/logout Logout 
 * @apiName Logout 
 * @apiGroup Auth
*/
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function sendToken(user, message, res) {
  let userData = {
    id: user.id,
    name: user.name
  };

  const token = jwt.sign(userData, config.get('jwt:secret'), {
    expiresIn: config.get('jwt:expires')
  });

  res.json({
    "message": message,
    "token": token
  });
}

function isEmailValid(email, res) {
  const VALID_EMAIL_REGEX = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  let isEmailValid = !!email && !!email.trim() 
    && VALID_EMAIL_REGEX.test(email);

  if(!isEmailValid) {
    res.status(403).send({
      message: "Email is invalid",
      target: "email"
    });
    return false;
  }
  return true;
}

function isUsernameValid(username, res) {
  const VALID_USERNAME_REGEX = /^\w{4,30}$/;
  let isUsernameValid = !!username && !!username.trim() 
    && VALID_USERNAME_REGEX.test(username);

  if(!isUsernameValid) {
    res.status(403).send({
      message: "Username is invalid",
      target: "username"
    });
    return false;
  }
  return true;
}

function isPasswordValid(password, res) {
  const VALID_PASSWORD_REGEX = /^\S{6,30}$/;
  let isPasswordValid = !!password && !!password.trim()
    && VALID_PASSWORD_REGEX.test(password);

  if(!isPasswordValid) {
    res.status(403).send({
      message: "Password is invalid",
      target: "password"
    });
    return false;
  }
  return true;
}

module.exports = router;
