"use strict";

module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('comment', {
        loginId: {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        nick: {
            type : DataTypes.STRING(20),
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
}