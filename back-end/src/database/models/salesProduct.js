const salesProduct = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
      saleId: {
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: DataTypes.INTEGER,
    },
    { 
      timestamps: false,
      underscored: true,
      tableName: 'sales_products',
    },
  );

  salesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: models.salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products',
    });

    models.product.belongsToMany(models.sale, {
      through: models.salesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });
  };

  return salesProduct;
};

module.exports = salesProduct;