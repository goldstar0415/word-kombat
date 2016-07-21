// ORM tool
const Sequelize = require('sequelize');
// Database configuration
const database = require('../config').get('database');

// Connection settings
const sequelize = new Sequelize(database.name, 
    database.user, database.password, {
    host: database.host,
    dialect: database.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// User entity schema
const User = sequelize.define('User', {
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    icon: Sequelize.STRING,
    score: Sequelize.INTEGER
}, {
    timestamps: false,
});

// Rank entity schema
const Rank = sequelize.define('Rank', {
    name: Sequelize.STRING,
    minScore: Sequelize.INTEGER
}, {
  timestamps: false,
});

// Word entity schema
const Word = sequelize.define('Word', {
    word: Sequelize.STRING,
    image: Sequelize.STRING,
    hint: Sequelize.TEXT
}, {
  timestamps: false,
});

// Translation entity schema
const Translation = sequelize.define('Translation', {
    translation: Sequelize.STRING
}, {
  timestamps: false,
});

// Language entity schema
const Language = sequelize.define('Language', {
    name: Sequelize.STRING
}, {
  timestamps: false,
});

// Match entity schema
const Match = sequelize.define('Match', {
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE
}, {
    timestamps: false
});

// Match score entity schema
const MatchScore = sequelize.define('MatchScore', {
    score: Sequelize.INTEGER
}, {
    timestamps: false
});

// User - Rank One to One mapping
Rank.hasOne(User);

// Word - Translations One to Many mapping
Word.hasMany(Translation);

// Language - Translation One to One mapping
Translation.hasOne(Language);

// Match - MatchScores One to Many mapping
Match.hasMany(MatchScore);

// User - MatchScores One to Many mapping
User.hasMany(MatchScore);

// Word - MatchScores One to Many mapping
Word.hasMany(MatchScore);

// Users - Words Many to Many mapping
const Dictionary = sequelize.define('Dictionaries', {}, {timestamps: false});
User.belongsToMany(Word, {through: Dictionary});
Word.belongsToMany(User, {through: Dictionary});

// Users - Matches Many to Many mapping
const Competitors = sequelize.define('Competitors', {}, {timestamps: false});
User.belongsToMany(Match, {through: Competitors});
Match.belongsToMany(User, {through: Competitors});

module.exports = sequelize;