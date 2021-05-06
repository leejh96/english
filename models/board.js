"use strict";

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board',{
        title : {
            type :  DataTypes.STRING(50),
            allowNull : false,
        },
        author : {
            type :  DataTypes.STRING(30),
            allowNull : false,
        },
        text : {
            type : DataTypes.TEXT,
            allowNull : true
        },
        createText : {
            type :  DataTypes.DATE,
            defaultValue : sequelize.literal('now()'),

        },
        uploads : {
            type : DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps : false,
        dialectOptions: {
            dateStrings: true
        },
    });
};