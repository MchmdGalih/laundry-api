"use strict";
const { Model } = require("sequelize");
const { options } = require("../router/auth");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Status, {
        foreignKey: "status",
      });
      Orders.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Orders.hasOne(models.Transaction, {
        foreignKey: "order_id",
      });
    }
  }
  Orders.init(
    {
      weight: { type: DataTypes.INTEGER },
      prices: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Statuses",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          defaultValue: 1,
        },
      },
    },
    {
      hooks: {
        afterCreate: async (order, options) => {
          try {
            await sequelize.models.AuditLog.create({
              tableName: "Orders",
              task: "insert",
              desc: `Process insert data to ${JSON.stringify(order.toJSON())}`,
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
      modelName: "Orders",
    }
  );
  return Orders;
};
