const db = require('./index.js');

class RankRepository {
  
  findById(id) {
    return db.models.Rank.findById(id);
  }

  findAll() {
    return db.models.Rank.findAll({order: '"minScore"'});
  }

}

module.exports = RankRepository;