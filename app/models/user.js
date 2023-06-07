"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Orders, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING },
    },
    {
      hooks: {
        afterCreate: async (user, options) => {
          try {
            await sequelize.models.AuditLog.create({
              tableName: "Users",
              task: "insert",
              desc: `Process insert data to ${JSON.stringify(user.toJSON())}`,
            });
          } catch (err) {
            console.log(err);
          }
        },
      },
      sequelize,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
