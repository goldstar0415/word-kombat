const passwordHash = require('password-hash');
const express = require('express');
const router = express.Router();

const log = require('../logger');
const userRepository = new (require("../repositories/user.repository"))();

const passport = require('../passport/jwt');

/**
 * @api {get} api/users/ Request information about all users
 * @apiName getUsers
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id User Id.
 * @apiSuccess {String} type Type of the user.
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} second_name Second name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} phone Phone number of the User.
 * @apiSuccess {String} bio User description
 * @apiError NoTokenProvided Only authenticated users can access the data.
*/
router.get('/', (req, res) => {
  userRepository.findAll()
    .then(users => {
      !!users && users.forEach(user => user.password = undefined);
      res.json(users);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {get} api/users/:id Request information about user by id
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id User Id.
 * @apiSuccess {String} type Type of the user.
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} second_name Second name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} phone Phone number of the User.
 * @apiSuccess {String} bio User description
 *
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 * @apiError NoTokenProvided Only authenticated users can access the data.
 *
*/
router.get('/:id(\\d+)', (req, res) => {
  userRepository.findById(req.params.id)
   .then(user => {
      if(user) {
        user.password = undefined;
      }
      res.json(user);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {get} api/users/:name Request information about user by first name
 *
 * @apiName getUserByName
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id User Id.
 * @apiSuccess {String} type Type of the user.
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} second_name Second name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} phone Phone number of the User.
 * @apiSuccess {String} bio User description
 *
 * @apiError UserNotFound The <code>first_name</code> of the User was not found.
 * @apiError NoTokenProvided Only authenticated users can access the data.
 *
*/
router.get('/:name(\\w+)', (req, res) => {
  userRepository.findByName(req.params.name)
   .then(user => {
      if(!!user) {
        user.password = undefined;
      }
      res.json(user);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {get} api/users/:email Request information about user by email
 *
 * @apiName getUserByEmail
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id User Id.
 * @apiSuccess {String} type Type of the user.
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} second_name Second name of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} phone Phone number of the User.
 * @apiSuccess {String} bio User description
 *
 * @apiError UserNotFound The <code>email</code> of the User was not found.
 * @apiError NoTokenProvided Only authenticated users can access the data.
 *
*/
router.get('/:email(.+\@.+\..+)', (req, res) => {
  userRepository.findByEmail(req.params.email)
   .then(user => {
      if(!!user) {
        user.password = undefined;
      }
      res.json(user);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {put} api/users/:id Update User with id
 * @apiName updateUser 
 * @apiGroup Users
 *
 * @apiParam {Integer} id User id.
 * @apiParam {User} user User to update.
 *
 * @apiSuccess {String} message Success message.
 * @apiError NoTokenProvided Only authenticated users can access the data.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiError Invalid data.
*/
router.put('/:id(\\d+)',
    passport.authenticate('jwt', passport.jwtSettings),
    (req, res) => {

  if(req.params.id != req.user.id) {
    return res.status(403).json({
      status: 403,
      message: "You haven't got owner privileges"
    });
  }

  let user = req.body;
  user.password = passwordHash.generate(user.password);

  userRepository.update(req.params.id, user)
    .then(user => {
      if(!!user) {
        user.password = undefined;
      }
      res.json(user);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {delete} api/users/:id Delete user with id 
 * @apiName deleteUser 
 * @apiGroup Users
 *
 * @apiParam {Integer} id User id.
 *
 * @apiSuccess {String} message Success message.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiError NoTokenProvided Only authenticated users can access the data.
*/
router.delete('/:id(\\d+)',
    passport.authenticate('jwt', passport.jwtSettings),
    (req, res) => {

  if(req.params.id != req.user.id) {
    return res.status(403).json({
      status: 403,
      message: "You haven't got owner privileges"
    });
  }

  userRepository.delete(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

module.exports = router;
