const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;