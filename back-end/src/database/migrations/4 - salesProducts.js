'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("salesProducts", {
      sale_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'sales',
            key: 'id',
          },
          onDelete: 'CASCADE',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("salesProducts");
  }
};
