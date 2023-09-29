const { INTEGER } = require("sequelize")
const dbConnect = require("./dbConnect")
const {DataTypes, Sequelize} = require ("sequelize")

const User = dbConnect.define("user",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER

    },
    firstName:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    lastName:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
})
User.sync({alter:true})
module.exports = User