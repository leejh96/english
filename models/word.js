"use strict";

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('word',{
        spelling : {
            type :  DataTypes.STRING(50),
            allowNull : false,
        },
        meaning : {
            type :  DataTypes.STRING(30),
            allowNull : false,
        }

    }, {
        timestamps : false
    });
};