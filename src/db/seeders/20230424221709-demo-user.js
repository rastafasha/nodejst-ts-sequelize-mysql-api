'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert('Users', [{
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@superadmin.com',
                roleId: 1,
                password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
                verified: true,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@admin.com',
                roleId: 2,
                password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
                verified: true,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'User',
                lastName: 'Guest',
                email: 'guest@guest.com',
                roleId: 3,
                password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS", //password
                verified: true,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};