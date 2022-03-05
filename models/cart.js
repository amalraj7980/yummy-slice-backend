'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: 'userId' })
        }
    }
    Cart.init({
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
            unique: true,
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
    }, {
        sequelize,
        tableName: 'carts',
        modelName: 'Cart'
    })
    return Cart
};