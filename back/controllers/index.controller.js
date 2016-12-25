const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render("index", {user: req.user});
});

router.get(['/chat', '/account', '/leaderboards'], (req, res) => {
  const mainFilePath = path.join(__dirname, '..', '..', 'front', 'dist',
    'guess-word-app', 'main.html');
  res.sendFile(path.join(mainFilePath));
});

module.exports = router;