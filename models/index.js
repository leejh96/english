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
db.Comment = require('./comment')(sequelize, Sequelize);
db.Category = require('./category')(sequelize,Sequelize);
db.Op = Sequelize.Op;

db.User.belongsToMany(db.Word, {through: 'userWord'});
db.Word.belongsToMany(db.User, {through: 'userWord'});

db.Word.belongsToMany(db.Category, {through: 'wordCategory'});
db.Category.belongsToMany(db.Word, 
    {through: 'wordCategory'},
    {onDelete: 'CASCADE'}
);

db.User.hasMany(db.Board);
db.Board.belongsTo(db.User);

db.Board.hasMany(db.Comment,{
    onDelete: 'CASCADE'
});
db.Comment.belongsTo(db.Board);
module.exports = db;