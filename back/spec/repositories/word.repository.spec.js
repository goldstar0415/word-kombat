const db = require('../../repositories');
const wordRepository = new (require('../../repositories/word.repository'))();
const Word = require('../../models/word.model');

db.options.logging = false;
db.config.database = "test";
db.config.username = "test";
db.config.password = "test";

xdescribe("Word repository", () => {
  // Dummy data
  const words = [
    new Word(1, 'cat', 'images/words/cat.jpg', 'Some random hint'),
    new Word(2, 'bird', 'images/words/bird.jpg', 'Some random hint'),
    new Word(3, 'many', 'images/words/many.jpg', 'Some random hint'),
    new Word(4, 'words', 'images/words/words.jpg', 'Some random hint'),
    new Word(5, 'work', 'images/words/work.jpg', 'Some random hint'),
    new Word(6, 'add', 'images/words/add.png', 'Some random hint'),
    new Word(7, 'agree', 'images/words/agree.png', 'Some random hint'),
    new Word(8, 'approve', 'images/words/approve.png', 'Some random hint'),
    new Word(9, 'break', 'images/words/break.jpg', 'Some random hint'),
    new Word(10, 'calculate', 'images/words/calculate.jpg', 'Some random hint'),
    new Word(11, 'choose', 'images/words/choose.jpg', 'Some random hint'),
    new Word(12, 'compare', 'images/words/compare.png', 'Some random hint'),
    new Word(13, 'compete', 'images/words/compete.jpg', 'Some random hint'),
    new Word(14, 'contain', 'images/words/contain.jpg', 'Some random hint'),
    new Word(15, 'create', 'images/words/create.jpg', 'Some random hint'),
    new Word(16, 'deliver', 'images/words/deliver.png', 'Some random hint'),
    new Word(17, 'different', 'images/words/different.jpg', 'Some random hint'),
    new Word(18, 'earn', 'images/words/earn.jpg', 'Some random hint'),
    new Word(19, 'enter', 'images/words/enter.jpg', 'Some random hint'),
    new Word(20, 'explore', 'images/words/explore.jpg', 'Some random hint')
  ];

  beforeEach(done => {

    db.sync({force: true}).then(() => {
      wordRepository.addAll(words).then(words => {
        done();
      });
    });

  });

  afterEach(done => {
    wordRepository.truncate().then(() => {
      done();
    })
  });

  // SELECT 
  it("should finds Word by id", done => {

    wordRepository.findById(1).then(word => {
      expect(JSON.stringify(words[0].values))
        .toBe(JSON.stringify(word.dataValues));
      done();
    });

  });

  it("should get specified amount of random words", done => {
    const AMOUNT = 10;
    wordRepository.getRandomWords(AMOUNT).then(words => {
        expect(words.length).toBe(AMOUNT);

        words.forEach((word, index) => {
          words.forEach((word2, index2) => {
            if(index !== index2) {
              expect(word.id).not.toBe(word2.id);
            }
          });
        });

        done();
    });
  });

  // INSERT 
  it("should creates new word", done => {

    let word = new Word(21, 'random1', 'images/words/words.jpg', 'Some random hint');
    
    wordRepository.add(word).then(() => {
      wordRepository.findById(21).then(retrievedWord => {
        expect(JSON.stringify(word.values))
          .toBe(JSON.stringify(retrievedWord.dataValues));
        done();
      });
    });

  });

  // UPDATE
  it("should update word value", done => {
    wordRepository.findById(1).then(word => {
      word.value = "newvalue";
      word.save().then(() => {
        wordRepository.findById(1).then(word => {
            expect(word.dataValues.value).toBe("newvalue");
            done();
        });
      });
    });
  });

  it("should update word image", done => {
    wordRepository.findById(1).then(word => {
      word.image = "newimage.png";
      word.save().then(() => {
        wordRepository.findById(1).then(word => {
            expect(word.dataValues.image).toBe("newimage.png");
            done();
        });
      });
    });
  });

  it("should update word hint", done => {
    wordRepository.findById(1).then(word => {
      word.hint = "new random hint";
      word.save().then(() => {
        wordRepository.findById(1).then(word => {
            expect(word.dataValues.hint).toBe("new random hint");
            done();
        });
      });
    });
  });

  // DELETE
  it("should delete word by id", done => {
    wordRepository.delete(1).then(() => {

      wordRepository.findById(1).then(word => {
        expect(word).toBeNull();
        done();
      });

    });

  });

});
