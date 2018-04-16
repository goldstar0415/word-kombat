const express = require('express');
const router = express.Router();

const userRepository = new (require("../repositories/user.repository"))();

/**
 * @api {get} api/leaderboards/ Returns TOP 100 users by score
 * @apiName getLeaderboards
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id User Id.
 * @apiSuccess {String} username name of the User.
 * @apiSuccess {String} icon User's icon.
 * @apiSuccess {Number} score User's score.
 * @apiSuccess {Rank} rank User's rank.
*/
router.get('/', (req, res, next) => {
  
  userRepository.findAll({limit: 100, order: 'score DESC'})
    .then(users => {
      users.forEach(user => user.password = undefined);
      res.json(users);
    });

});

module.exports = router;