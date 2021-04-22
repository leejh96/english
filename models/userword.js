"use strict";

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userWord',{
        updateSpelling : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        },
        updateMeaning : {
            type :  DataTypes.STRING(20),
            allowNull : true,
        },
        category : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        }
    }, {
    });
}