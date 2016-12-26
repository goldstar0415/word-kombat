// ORM tool
const Sequelize = require('sequelize');
// Database configuration
const database = require('../config').get('database');

const RankModel = require('../models/rank.model.js');

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
    value: Sequelize.STRING,
    image: Sequelize.STRING,
    hint: Sequelize.TEXT
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

// User - Rank One to Many mapping
Rank.hasMany(User, { foreignKey: 'rank' });

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

sequelize.models.Rank.upsert(new RankModel(1, '1', 0));
sequelize.models.Rank.upsert(new RankModel(2, '2', 200));
sequelize.models.Rank.upsert(new RankModel(3, '3', 400));

module.exports = sequelize;
