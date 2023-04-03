
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class User extends Model{}
User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }
    ,
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
      }
)
module.exports=User