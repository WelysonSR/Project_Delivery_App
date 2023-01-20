module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('users',
        [{
          id: 1,
          name: 'Lewis Hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          role: 'client',
        },
        {
          id: 2,
          name: 'Michael Schumacher',
          email: 'MichaelSchumacher@gmail.com',
          password: '123456',
          role: 'admin',
        },
        ], { timestamps: false });
    },
  
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };
  