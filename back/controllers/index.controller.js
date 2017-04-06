const path = require('path');
const express = require('express');
const router = express.Router();
const log = require('../logger');
const wordsRepository = new (require("../repositories/word.repository"))();

router.get('/', (req, res) => {
  wordsRepository.getRandomWords(6)
    .then(words => {
      res.render("index", {
        "words": words.map(word => word.dataValues)
      });
    })
    .catch(error => {
      log.error(error);
      res.status(500).json(error);
    })
});

router.get(['/chat', '/account', '/leaderboards'], (req, res) => {
  const mainFilePath = path.join(__dirname, '..', '..', 'front', 'dist', 'index.html');
  res.sendFile(path.join(mainFilePath));
});

module.exports = router;
