module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('sales',
        [
            {
            id: 1,
            user_id: 1 ,
            seller_id: 1,
            total_price: 10,
            delivery_address: 'r dos bobos n 0',
            delivery_number: '303310',
            sale_time:  new Date('2011-08-01T19:58:00.000Z'),
            status: 'a'
        },
        {
            id: 2,
            user_id: 2 ,
            seller_id: 2,
            total_price: 20,
            delivery_address: 'r dos bobos n 10',
            delivery_number: '102301',
            sale_time:  new Date('2012-08-01T19:58:00.000Z'),
            status: 'b'
        }
        ]);
    },
  
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('sales', null, {});
    },
  };
  