'use strict';

module.exports = {
    async up(queryInterface, _Sequelize) {
        await queryInterface.bulkInsert('salesProducts',
            [
                {
                    sale_id: 1,
                    product_id: 1,
                    quantity: 3,
                },
                {
                    sale_id: 2,
                    product_id: 2,
                    quantity: 3,
                },
            ], {});

    },

    async down(queryInterface, _Sequelize) {

        await queryInterface.bulkDelete('salesProducts', null, {});

    }
};