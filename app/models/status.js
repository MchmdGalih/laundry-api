"use strict";
const { Model } = require("sequelize");
const { options } = require("../router/auth");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Orders, { foreignKey: "status" });
    }
  }
  Status.init(
    {
      status: { type: DataTypes.STRING },
      details: { type: DataTypes.TEXT },
    },
    {
      hooks: {
        afterCreate: async (status, options) => {
          try {
            await sequelize.models.AuditLog.create({
              tableName: "Status",
              task: "insert",
              desc: `Process insert data to ${JSON.stringify(status.toJSON())}`,
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
      modelName: "Status",
    }
  );
  return Status;
};
