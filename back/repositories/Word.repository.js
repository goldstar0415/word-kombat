const db = require('./index.js');

class WordRepository {

  findById(id) {
    return db.models.Word.findById(id);
  }

  getRandomWords(amount) {
    return db.models.Word.findAll({
      limit: amount
    });
  }

  add(word) {
    return db.transaction(t => {
      
      return db.models.Word.create({
        word: word.word,
        image: word.image,
        hint: word.hint
      }, {transaction: t});
    
    });
  }

  addAll(words) {
    return db.transaction(t => {
      let wordsToSave = words.map(word => {
        return {
          word: word.word,
          image: word.image,
          hint: word.hint
        }
      });
      return db.models.Word.bulkCreate(wordsToSave, {transaction: t});
    });
  }

  delete(id) {
    return db.transaction(t => {
      
      return db.models.Word.findById(1).then(word => {
        return word.destroy({transaction: t});
      });

    });
  }

  truncate() {
    return db.transaction(t => {
      return db.models.Word.truncate({
        cascade: true
      }, {transaction: t});
    });
  }

  drop() {
    return db.transaction(t => {
      return db.models.Word.drop({
        cascade: true
      });
    })
  }

}

module.exports = WordRepository;
