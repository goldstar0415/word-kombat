const express = require('express');
const router = express.Router();

const userRepository = new (require("../repositories/user.repository"))();

router.get('/', (req, res, next) => {
  
  userRepository.findAll({limit: 100, order: 'score DESC'})
    .then(users => {
      users.forEach((_, i) => users[i].password = undefined);
      res.json(users);
    });

});

module.exports = router;