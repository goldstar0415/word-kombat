const db = require('../../repositories');
const UserRepository = require('../../repositories/User.repository');
const User = require('../../models/User.model');

db.options.logging = false;
db.config.database = "demo";
db.config.username = "demo";
db.config.password = "demo";

describe("User repository", () => {
  const userRepository = new UserRepository();
  // Dummy data
  const users = [
    new User(1, 'dummy1@email.com', 'dummy-name1', '1111', 'dummy-icon1', 5, null),
    new User(2, 'dummy2@email.com', 'dummy-name2', '1110', 'dummy-icon2', 15, null),
    new User(3, 'dummy3@email.com', 'dummy-name3', '1101', 'dummy-icon3', 25, null),
    new User(4, 'dummy4@email.com', 'dummy-name4', '1011', 'dummy-icon4', 35, null),
    new User(5, 'dummy5@email.com', 'dummy-name5', '0111', 'dummy-icon5', 54, null)
  ];

  beforeEach(done => {

    db.sync({force: true}).then(() => {
      userRepository.addAll(users).then(() => {
        done();
      });
    });

  });

  afterEach(done => {
    userRepository.truncate().then(() => {
      done();
    })
  });

  it("should finds User by id", done => {

    userRepository.findById(1).then(user => {
      expect(users[0].equalsByValues(user.dataValues)).toBeTruthy();
      done();
    });

  });

  it("should finds User by email", done => {
    userRepository.findByEmail('dummy1@email.com').then(user => {
      expect(users[0].equalsByValues(user.dataValues)).toBeTruthy();
      done();
    });
  });

  it("should creates new User", done => {

    let user = new User(1, 'random@email.com', 'random-name',
      '1111', 'some_icon', 3000, null);
    
    userRepository.add(user).then(() => {
      userRepository.findById(1).then(retrievedUser => {
        expect(users[0].equalsByValues(user.dataValues)).toBeTruthy();
        done();
      });
    });

  });

  it("should delete user by id", done => {
    userRepository.delete(1).then(() => {

      userRepository.findById(1).then(user => {
        expect(user).toBeNull();
        done();
      });

    });

  });

});
