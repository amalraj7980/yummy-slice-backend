'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: "userId" })
        }
    }
    Orders.init({
        transactionId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            },
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        totalQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        deliveryAddress: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'orders',
        modelName: 'Orders'
    })
    return Orders
};