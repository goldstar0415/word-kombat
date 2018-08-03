module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('word', [
      {
        id: 1,
        value: 'cat',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/cat.jpg',
        hint: 'It\'s a small, typically furry, animal',
      },
      {
        id: 2,
        value: 'dog',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/dog.jpg',
        hint: 'Their bodies are covered with feathers and they have wings',
      },
      {
        id: 3,
        value: 'bird',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/bird.jpg',
        hint: 'Their bodies are covered with feathers and they have wings',
      },
      {
        id: 4,
        value: 'wolf',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/wolf.jpg',
        hint: 'They hunt and eat live prey, mostly rabbits and rodents (rats and mice)',
      },
      {
        id: 5,
        value: 'fox',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/fox.jpg',
        hint: 'They hunt and eat live prey, mostly rabbits and rodents (rats and mice)',
      },
      {
        id: 6,
        value: 'lion',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/lion.jpg',
        hint: 'The king of the jungle',
      },
      {
        id: 7,
        value: 'tiger',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/tiger.jpg',
        hint: 'They are most recognisable for their pattern of dark vertical stripes on reddish-orange fur with a lighter underside',
      },
      {
        id: 8,
        value: 'hen',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/hen.jpg',
        hint: 'It is raised widely for its meat and eggs',
      },
      {
        id: 9,
        value: 'cow',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/cow.jpg',
        hint: 'Large grass-eating mammal',
      },
      {
        id: 10,
        value: 'bull',
        image: 'http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/bull.jpg',
        hint: 'It\'s an adult male of the cattle',
      },
    ], {
      updateOnDuplicate: [
        'value', 'image', 'hint',
      ],
    }),

  down: (queryInterface) => queryInterface.bulkDelete('word', null, {}),
};
