const db = require('./index.js');

class UserRepository {
  
  add(user) {
    return db.transaction(t => {
    
      return db.models.User.create({
        email: user.email,
        name: user.name,
        password: user.password,
        icon: user.icon,
        score: user.score
      }, {transaction: t});
    
    });
  }

  addAll(users) {
    return db.transaction(t => {
      let usersToSave = users.map(user => {
        return {
          email: user.email,
          name: user.name,
          password: user.password,
          icon: user.icon,
          score: user.score
        }
      });
      return db.models.User.bulkCreate(usersToSave, {transaction: t});
    });
  }

  delete(id) {
    return db.transaction(t => {
      
      return db.models.User.findById(1).then(user => {
        return user.destroy({transaction: t});
      });

    });
  }

  findById(id) {
    return db.models.User.findById(id);
  }

  findByEmail(email) {
    return db.models.User.findOne({
      where: { email: email }
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