const express = require('express');

module.exports = [
  (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  (err, req, res, next) => {
    if(express().get('env') === 'development') {
      res.status(err.status || 500);
      if(!!err && !!err.status){
      // Should log error
        res.render('error-' + err.status);
      } else {
      // Should log error
        res.render('error-500');
      }
    } else {
      res.status(err.status || 500);
      if(!!err && !!err.status){
      // Should log error
        res.render('error-' + err.status);
      } else {
      // Should log error
        res.render('error-500');
      }
    }
  }

];
