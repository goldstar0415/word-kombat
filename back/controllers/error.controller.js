const express = require('express');
const log = require('../logger');

module.exports = {
  
  clientError: (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

  serverError: (err, req, res, next) => {
    if (req.originalUrl.substring(0, 4) == "/api") {
      return res.status(err.status || 500).send({
        message: err.message,
        error: err
      });
    }

    res.status(err.status || 500);

    if(!!err && err.status === 404) {
      log.info(err);
      return res.render('error-404');
    } else {
      log.info("Unhandled Error");
      return res.render('error-500');
    }
    next(err);
  }

};
