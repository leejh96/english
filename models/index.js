'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.databsse, config.username, config.password, config)
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Word = require('./word')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);

db.User.belongsToMany(db.Word, {through: 'matching'});
db.Word.belongsToMany(db.User, {through: 'matching'});

db.User.hasMany(db.Board);
db.Board.belongsTo(db.User);

module.exports = db;