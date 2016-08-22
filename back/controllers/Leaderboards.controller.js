const path = require('path');
const express = require('express');
const router = express.Router();

const UserRepository = require("../repositories/User.repository");
const userRepository = new UserRepository();

router.get('/', (req, res, next) => {
  
  userRepository.findAll({limit: 100, order: 'score DESC'})
    .then(users => {
      users.forEach((_, i) => users[i].password = undefined);
      res.send(users);
    });

});

module.exports = router;