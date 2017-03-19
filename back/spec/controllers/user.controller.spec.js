const request = require('supertest');
const express = require('express');

const app = express();
const userController = require('../../controllers/user.controller');

app.use('/api/users', userController);

describe("User Controller", () => {

  describe("GET api/users", () => {

    it("Should have HTTP status 200", done => {
      request(app)
        .get('/api/users')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });

    it("Should return json", done => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });
    });

  });

});

