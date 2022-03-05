'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WishlistedProducts extends Model {
    }
    WishlistedProducts.init({
        wishlisted: DataTypes.BOOLEAN
    }, {
        sequelize,
        tableName: 'wishlistedproducts',
        modelName: 'WishlistedProducts'
    })

    return WishlistedProducts
};