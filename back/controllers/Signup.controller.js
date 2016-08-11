const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = passport => {
 
  return router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash : true
  }));

};