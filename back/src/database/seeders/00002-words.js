module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("word", [
      {
        id: 1,
        value: "cat",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/cat.jpg",
        hint: "It's a small, typically furry, animal"
      },
      {
        id: 2,
        value: "dog",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/dog.jpg",
        hint: "Their bodies are covered with feathers and they have wings"
      },
      {
        id: 3,
        value: "bird",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/bird.jpg",
        hint: "Their bodies are covered with feathers and they have wings"
      },
      {
        id: 4,
        value: "wolf",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/wolf.jpg",
        hint: "They hunt and eat live prey, mostly rabbits and rodents (rats and mice)"
      },
      {
        id: 5,
        value: "fox",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/fox.jpg",
        hint: "They hunt and eat live prey, mostly rabbits and rodents (rats and mice)"
      },
      {
        id: 6,
        value: "lion",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/lion.jpg",
        hint: "The king of the jungle"
      },
      {
        id: 7,
        value: "tiger",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/tiger.jpg",
        hint: "They are most recognisable for their pattern of dark vertical stripes on reddish-orange fur with a lighter underside"
      },
      {
        id: 8,
        value: "hen",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/hen.jpg",
        hint: "It is raised widely for its meat and eggs"
      },
      {
        id: 9,
        value: "cow",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/cow.jpg",
        hint: "Large grass-eating mammal"
      },
      {
        id: 10,
        value: "bull",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/bull.jpg",
        hint: "It's an adult male of the cattle"
      },
      {
        id: 11,
        value: "add",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/add.png",
        hint: "Arithmetical operation"
      },
      {
        id: 12,
        value: "subtract",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/subtract.png",
        hint: "Arithmetical operation"
      },
      {
        id: 13,
        value: "divide",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/divide.jpg",
        hint: "Arithmetical operation"
      },
      {
        id: 14,
        value: "multiply",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/multiply.png",
        hint: "Arithmetical operation"
      },
      {
        id: 15,
        value: "time",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/time.jpg",
        hint: "It\'s the indefinite continued progress of existence and events " +
        "that occur in apparently irreversible succession from the past through " +
        "the present to the future"
      },
      {
        id: 16,
        value: "people",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/people.jpg",
        hint: "It\'s a plurality of persons considered as a whole"
      },
      {
        id: 17,
        value: "way",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/way.jpg",
        hint: "A road, route, path or pathway"
      },
      {
        id: 18,
        value: "day",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/day.jpg",
        hint: "A unit of time. In common usage, it is either an interval equal to 24 hours or the consecutive period of time during which the Sun is above the horizon"
      },
      {
        id: 19,
        value: "world",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/world.jpg",
        hint: "The planet Earth and all life upon it"
      },
      {
        id: 20,
        value: "school",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/school.jpg",
        hint: "An institution designed to provide learning spaces and learning environments for the teaching of students under the direction of teachers"
      },
      {
        id: 21,
        value: "hand",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/hand.jpg",
        hint: "The part of the body at the end of the arm"
      },
      {
        id: 22,
        value: "system",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/system.jpg",
        hint: "A set of interacting or interdependent component parts forming a complex or intricate whole"
      },
      {
        id: 23,
        value: "program",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/program.png",
        hint: "A collection of instructions that performs a specific task when executed by a computer"
      },
      {
        id: 24,
        value: "question",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/question.jpg",
        hint: "A linguistic expression used to make a request for information"
      },
      {
        id: 25,
        value: "work",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/work.jpg",
        hint: "Physical or mental effort or activity directed toward the production or accomplishment of something"
      },
      {
        id: 26,
        value: "number",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/number.jpg",
        hint: "A mathematical object used to count, measure, and label"
      },
      {
        id: 27,
        value: "night",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/night.jpg",
        hint: "The period of time between the sunset and the sunrise when the Sun is below the horizon"
      },
      {
        id: 28,
        value: "home",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/home.png",
        hint: "A place used as a permanent residence for an individual or family"
      },
      {
        id: 29,
        value: "water",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/water.jpg",
        hint: "H2O"
      },
      {
        id: 30,
        value: "room",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/room.jpg",
        hint: "Any distinguishable space within a structure"
      },
      {
        id: 31,
        value: "area",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/area.png",
        hint: "The quantity that expresses the extent of a two-dimensional figure or shape"
      },
      {
        id: 32,
        value: "money",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/money.jpg",
        hint: "It\'s what people use to buy things and services"
      },
      {
        id: 33,
        value: "story",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/story.jpg",
        hint: "When we tell others about a thing that happened"
      },
      {
        id: 34,
        value: "month",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/month.jpg",
        hint: "An amount of time used with calendars. It is about one twelfth of a year"
      },
      {
        id: 35,
        value: "study",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/study.jpg",
        hint: "An amount of time used with calendars. It is about one twelfth of a year"
      },
      {
        id: 36,
        value: "book",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/study.jpg",
        hint: "A set of printed sheets of paper held together between two covers"
      },
      {
        id: 37,
        value: "eye",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/eye.jpg",
        hint: "An organ of the visual system"
      },
      {
        id: 38,
        value: "house",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/eye.jpg",
        hint: "An organ of the visual system"
      },
      {
        id: 39,
        value: "power",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/power.jpg",
        hint: "How fast energy can be changed into work"
      },
      {
        id: 40,
        value: "game",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/game.png",
        hint: "Something that people do for fun"
      },
      {
        id: 41,
        value: "member",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/member.jpg",
        hint: "A person who belongs to a group of people"
      },
      {
        id: 42,
        value: "car",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/car.jpg",
        hint: "A road vehicle used to carry passengers"
      },
      {
        id: 43,
        value: "city",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/city.jpg",
        hint: "A large and permanent human settlement"
      },
      {
        id: 44,
        value: "team",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/team.jpg",
        hint: "A group of people linked in a common purpose"
      },
      {
        id: 45,
        value: "agree",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/agree.jpg",
        hint: "To come to one opinion or mind"
      },
      {
        id: 46,
        value: "approve",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/approve.jpg",
        hint: "To consent or agree to"
      },
      {
        id: 47,
        value: "break",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/break.jpg",
        hint: "A daily social gathering for a snack and short downtime practiced by employees in business and industry"
      },
      {
        id: 48,
        value: "calculate",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/calculate.jpg",
        hint: "Transform one or more inputs into one or more results, with variable change"
      },
      {
        id: 49,
        value: "celebrate",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/celebrate.jpg",
        hint: "To perform publicly and with appropriate rites"
      },
      {
        id: 50,
        value: "choose",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/choose.jpg",
        hint: "To select freely"
      },
      {
        id: 51,
        value: "different",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/different.jpg",
        hint: "Partly or totally unlike in nature, form, or quality"
      },
      {
        id: 52,
        value: "earn",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/earn.jpg",
        hint: "To receive as return for effort and especially for work done"
      },
      {
        id: 53,
        value: "enter",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/enter.jpg",
        hint: "To go or come in"
      },
      {
        id: 54,
        value: "many",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/many.jpg",
        hint: "Consisting of or amounting to a large but indefinite number"
      },
      {
        id: 55,
        value: "relax",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/relax.jpg",
        hint: "To make less tense"
      },
      {
        id: 56,
        value: "solve",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/solve.jpg",
        hint: "To find an explanation or answer for something"
      },
      {
        id: 57,
        value: "words",
        image: "http://res.cloudinary.com/mediastorage/image/upload/word-kombat/words/words.jpg",
        hint: "Units of language, consisting of one or more spoken sounds or their written representation"
      }
    ], {
      updateOnDuplicate: [
        "value", "image", "hint"
      ]
    }),

  down: (queryInterface) => queryInterface.bulkDelete("word", null, {})
};
