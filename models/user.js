// module.exports = (sequelize, DataTypes) =>{
//     return sequelize.define('user',{
//         name : {
//             type: DataTypes.STRING(40),
//             allowNull: false,
//         },
//         age : {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         loginID : {
//             type: DataTypes.STRING(40),
//             allowNull: false,
//             unique: true,
//         },
//         create_at: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: sequelize.literal('now()')
//         }
//     },{
//         timestamps: false,
//         underscored: true
//     });
// }

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        name: {
            type : DataTypes.STRING(40),
            allowNull : false,
        },
        age :{
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        loginID:{
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        createAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        }
    },{
        timestamps : true,
    });
};