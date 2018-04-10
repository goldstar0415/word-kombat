const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

const log = require('../logger');
const userRepository = new (require('../repositories/user.repository'))();
const UserDetailsValidator = require('../util/user-details.validator');

/**
 * @api {post} /api/auth SignIn
 * @apiName signin 
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
router.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const usernameValidationResult = UserDetailsValidator.validateUsername(username);
  const passwordValidationResult = UserDetailsValidator.validatePassword(password);

  if(usernameValidationResult) {
    return res.status(400).json(usernameValidationResult);
  }

  if(passwordValidationResult) {
    return res.status(400).json(passwordValidationResult);
  }

  userRepository.findByName(username)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: "User with this username not found",
          target: "username"
        });
      } else if(bcrypt.compareSync(password, user.password)) {
        sendToken(user, "Signed In successfuly", res);
      } else {
        res.status(403).json({
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
router.post('/signup', (req, res, next) => {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const usernameValidationResult = UserDetailsValidator.validateUsername(username);
  const emailValidationResult = UserDetailsValidator.validateEmail(email);
  const passwordValidationResult = UserDetailsValidator.validatePassword(password);

  if(usernameValidationResult) {
    return res.status(400).json(usernameValidationResult);
  }

  if(emailValidationResult) {
    return res.status(400).json(emailValidationResult);
  }

  if(passwordValidationResult) {
    return res.status(400).json(passwordValidationResult);
  }

  userRepository.findByEmail(email)
    .then(user => {
      throwIfAlreadyExsits(user, 'email');
      return userRepository.findByName(username);
    })
    .then(user => {
      throwIfAlreadyExsits(user, 'username');
      const newUser = {
        email: email,
        name: username,
        password: bcrypt.hashSync(password, 8),
        icon: 'https://robohash.org/' + username,
        score: 0
      }
      return userRepository.add(newUser);
    })
    .then(() => userRepository.findByEmail(email))
    .then(user => sendToken(user, "Signed Up successfully", res))
    .catch(error => {
      log.warn(error);
      if(error.status) {
        const status = error.status;
        error.status = undefined;
        res.status(status).json(error);
      } else {
        res.json(error);
      }
    });
});

function throwIfAlreadyExsits(user, target) {
  if(user) {
    throw {
      status: 409,
      message: `User with this ${target} already exists`,
      target: target
    };
  }
}

function sendToken(user, message, res) {
  const userData = {
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

module.exports = router;
