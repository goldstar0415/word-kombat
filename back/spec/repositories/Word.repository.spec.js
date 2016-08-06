const db = require('../../repositories');
const WordRepository = require('../../repositories/Word.repository');
const Word = require('../../models/Word.model');

db.options.logging = false;
db.config.database = "demo";
db.config.username = "demo";
db.config.password = "demo";

describe("Word repository", () => {
  const wordRepository = new WordRepository();
  // Dummy data
  // id, word, image, hint
  const words = [
    new Word(1, 'random1', 'images/words/words.jpg', 'Some random hint'),
    new Word(2, 'random2', 'images/words/words.jpg', 'Some random hint'),
    new Word(3, 'random3', 'images/words/words.jpg', 'Some random hint'),
    new Word(4, 'random4', 'images/words/words.jpg', 'Some random hint'),
    new Word(5, 'random5', 'images/words/words.jpg', 'Some random hint'),
  ];

  beforeEach(done => {

    db.sync({force: true}).then(() => {
      wordRepository.addAll(words).then(() => {
        done();
      });
    });

  });

  afterEach(done => {
    wordRepository.truncate().then(() => {
      done();
    })
  });

  it("should finds Word by id", done => {

    wordRepository.findById(1).then(word => {
      expect(words[0].values).toBe(word.dataValues.values);
      done();
    });

  });

  it("should creates new word", done => {

    let word = new Word(10, 'random1', 'images/words/words.jpg', 'Some random hint');
    
    wordRepository.add(word).then(() => {
      wordRepository.findById(10).then(retrievedWord => {
        expect(words[0].values).toBe(word.dataValues.values);
        done();
      });
    });

  });

  it("should delete word by id", done => {
    wordRepository.delete(1).then(() => {

      wordRepository.findById(1).then(word => {
        expect(word).toBeNull();
        done();
      });

    });

  });

});
