const db = require('./index.js');

class UserRepository {
  
  findById(id) {
    return db.models.User.findById(id);
  }

  findByEmail(email) {
    return db.models.User.findOne({
      where: {email: email}
    });
  }

  findByName(username) {
    return db.models.User.findOne({
      where: {name: username}
    });
  }

  findAll(options) {
    return db.models.User.findAll(options);
  }

  add(user) {
    return db.transaction(t => {
        return db.models.User.create({
         email: user.email,
         name: user.name,
         password: user.password,
         icon: user.icon,
         score: user.score,
         rank: 1
      }, {transaction: t});
    });
  }

  update(id, newUser) {
    return db.transaction(t => {
      return db.models.User.findById(id).then(user => {
        return user.update(newUser, {transaction: t});
      });
    })
  }

  addAll(users) {

    let usersToSave = users.map(user => {
      return {
        email: user.email,
        name: user.name,
        password: user.password,
        icon: user.icon,
        score: user.score
      }
    });

    return db.transaction(t => {
        return db.models.User.bulkCreate(usersToSave, {transaction: t});
    });
  }

  delete(id) {
    return db.transaction(t => {
      return db.models.User.findById(id).then(user => {
        return user.destroy({transaction: t});
      });
    });
  }

  truncate() {
    return db.transaction(t => {
      return db.models.User.truncate({
        cascade: true
      }, {transaction: t});
    });
  }

  drop() {
    return db.transaction(t => {
      return db.models.User.drop({
        cascade: true
      });
    })
  }

}

module.exports = UserRepository;