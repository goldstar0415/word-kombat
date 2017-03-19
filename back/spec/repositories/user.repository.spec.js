/*const db = require('../../repositories');
const userRepository = new (require('../../repositories/user.repository'))();
const User = require('../../models/user.model');

db.options.logging = false;
db.config.database = "test";
db.config.username = "test";
db.config.password = "test";

xdescribe("User repository", () => {
  // Dummy data
  const users = [
    new User(1, 'dummy1@email.com', 'dummy-name1', '1111', 'dummy-icon1', 5, 1),
    new User(2, 'dummy2@email.com', 'dummy-name2', '1110', 'dummy-icon2', 15, 1),
    new User(3, 'dummy3@email.com', 'dummy-name3', '1101', 'dummy-icon3', 25, 1),
    new User(4, 'dummy4@email.com', 'dummy-name4', '1011', 'dummy-icon4', 35, 1),
    new User(5, 'dummy5@email.com', 'dummy-name5', '0111', 'dummy-icon5', 54, 1)
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
      expect(JSON.stringify(users[0].values))
        .toBe(JSON.stringify(user.dataValues));
      done();
    });

  });

  it("should finds User by email", done => {
    userRepository.findByEmail('dummy1@email.com').then(user => {
      expect(JSON.stringify(users[0].values))
        .toBe(JSON.stringify(user.dataValues));
      done();
    });
  });

  it("should creates new User", done => {

    let user = new User(6, 'random@email.com', 'random-name',
      '1111', 'some_icon', 3000, null);
    
    userRepository.add(user).then(() => {

      userRepository.findAll().then(users => {
        expect(users.length).toBe(6);
      });

      userRepository.findById(6).then(retrievedUser => {
        expect(JSON.stringify(user.values))
          .toBe(JSON.stringify(retrievedUser.dataValues));
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

  it("should update username", done => {

    userRepository.findById(1).then(user => {
      user.name = "NEW NAME";
      user.save().then(() => {
        userRepository.findById(1).then(user => {
            expect(user.dataValues.name).toBe("NEW NAME");
            done();
        });
      });
    });
  });

  it("should update email", done => {

    userRepository.findById(1).then(user => {
      user.email = "new@email.com";
      user.save().then(() => {
        userRepository.findById(1).then(user => {
            expect(user.dataValues.email).toBe("new@email.com");
            done();
        });
      });
    });
  });

  it("should update password", done => {

    userRepository.findById(1).then(user => {
      user.password = "newpa55word";
      user.save().then(() => {
        userRepository.findById(1).then(user => {
            expect(user.dataValues.password).toBe("newpa55word");
            done();
        });
      });
    });
  });

  it("should update icon", done => {

    userRepository.findById(1).then(user => {
      user.icon = "newIcons.png";
      user.save().then(() => {
        userRepository.findById(1).then(user => {
            expect(user.dataValues.icon).toBe("newIcons.png");
            done();
        });
      });
    });
  });

  it("should update score", done => {

    userRepository.findById(1).then(user => {
      user.score += 100;
      user.save().then(() => {
        userRepository.findById(1).then(user => {
            expect(user.dataValues.score).toBe(105);
            done();
        });
      });
    });
  });

  it("should update rank", done => {
    done();
  });

});
*/