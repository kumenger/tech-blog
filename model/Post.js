const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      references: {
        model: "user",
        key: "id",
      },
    },
    content_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_on: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    comments:{
        references: {
            model: "comment",
            key: "id",
          },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);
module.exports=Post
