'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reviews extends Model { };
    Reviews.init({
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        reviewMessage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        }
    }, {
        sequelize,
        modelName: 'Reviews',
        tableName: 'Reviews',
    });
    return Reviews;
};

