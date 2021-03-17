"use strict";

module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        name : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        loginId: {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true,
        },
        password: {
            type : DataTypes.STRING(100),
            allowNull : false,
            unique : true,
        },
        createAt: {
            type : DataTypes.DATE,
            defaultValue : sequelize.literal('now()'),
        }
    }, {
        timestamps : false
    });
};