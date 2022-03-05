'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        static associate({ User, Products }) {
            this.belongsTo(User, {
                foreignKey: 'userId'
            })
            this.belongsToMany(Products, { through: 'WishlistedProducts', foreignKey: 'WishlistId', otherKey: 'ProductId' })
        }
    }
    Wishlist.init({
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
            unique:true,
            validate: {
                notEmpty: true,
                notNull: true
            },
        }
    }, {
        sequelize,
        tableName: 'wishlists',
        modelName: 'Wishlist'
    })
    return Wishlist
};