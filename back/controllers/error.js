const express = require('express');
const log = require('../logger');

module.exports = {
  clientError: (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  serverError: (err, req, res, next) => {
    if(express().get('env') === 'development') {
      res.status(err.status || 500);
      if(!!err && !!err.status){
        log.info(err);
        res.render('error-' + err.status);
      } else {
        log.info("Unhandled Error");
        res.render('error-500');
      }
    } else {
      res.status(err.status || 500);
      if(!!err && !!err.status){
        log.info(err);
        res.render('error-' + err.status);
      } else {
        log.info("Unhandled Error");
        res.render('error-500');
      }
    }
    next(err);
  }

};
