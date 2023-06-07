"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Orders, {
        foreignKey: "order_id",
      });
    }
  }
  Transaction.init(
    {
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      pay_method: { type: DataTypes.STRING },
    },
    {
      hooks: {
        afterCreate: async (transaction, options) => {
          try {
            await sequelize.models.AuditLog.create({
              tableName: "Transactions",
              task: "insert",
              desc: `Process insert data to ${JSON.stringify(
                transaction.toJSON()
              )}`,
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
      modelName: "Transaction",
    }
  );
  return Transaction;
};
