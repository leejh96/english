"use strict";

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('word',{
        spelling : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        },
        meaning : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        }

    }, {
        timestamps : false
    });
};