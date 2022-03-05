'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wishlist, User }) {
      this.belongsToMany(Wishlist, { through: 'WishlistedProducts', foreignKey: 'ProductId', otherKey: 'WishlistId' })
      this.belongsToMany(User, { through: 'Reviews', foreignKey: 'productId', otherKey: 'userId'})
    }
  };
  Products.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    wishlisted: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products',
  });
  return Products;
};

