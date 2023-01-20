'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('products', 
      [
        {
          id: 1, 
       name: 'Antarctica', 
       price: 3.10, 
       url_image: ''

     },
     {
        id: 2, 
        name: 'Brahma',
        price: 3.50,
        url_image: ''
      },
     {
        id: 3, 
        name: 'Becks ',
        price: 5.50,
        url_image: ''
      },
      {
        id: 4, 
        name: 'Heineken ',
        price: 5.50,
        url_image: ''
      },
      {
        id: 5, 
        name: 'Skol',
        price: 3.49,
        url_image: ''
      },
      {
        id: 6, 
        name: 'Stella Artois',
        price: 5.49,
        url_image: ''
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('products', null, {});
     
  }
};