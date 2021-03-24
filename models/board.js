"use strict";

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board',{
        title : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        },
        author : {
            type :  DataTypes.STRING(20),
            allowNull : false,
        },
        text : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        createText : {
            type :  DataTypes.DATE,
            defaultValue : sequelize.literal('now()'),
        }
    }, {
        timestamps : false
    });
};