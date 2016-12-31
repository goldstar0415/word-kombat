const express = require('express');
const router = express.Router();

const log = require('../logger');
const rankRepository = new (require("../repositories/rank.repository"))();

/**
 * @api {get} api/ranks/ Request information about all ranks
 * @apiName getRanks 
 * @apiGroup Ranks
 *
 * @apiSuccess {Integer} id Rank Id.
 * @apiSuccess {String} name Rank name.
 * @apiSuccess {Number} minScore minimal score to achieve rank.
 * @apiSuccess {String} image Rank image.
*/
router.get('/', (req, res) => {
  rankRepository.findAll()
    .then(ranks => {
      res.json(ranks);
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});

/**
 * @api {get} api/ranks/:score/next Request information about next rank by score
 * @apiName getRanks 
 * @apiGroup Ranks
 *
 * @apiSuccess {Integer} id Rank Id.
 * @apiSuccess {String} name Rank name.
 * @apiSuccess {Number} minScore minimal score to achieve rank.
 * @apiSuccess {String} image Rank image.
*/
router.get('/:score(\\d+)/next', (req, res) => {
  rankRepository.findAll()
    .then(ranks => {
      for(let i in ranks) {
        if(ranks[i].minScore > req.params.score) {
          return res.json(ranks[i]);
        }
      }
      res.json({});
    })
    .catch(error => {
      log.error(error);
      res.json(error);
    });
});


module.exports = router;
