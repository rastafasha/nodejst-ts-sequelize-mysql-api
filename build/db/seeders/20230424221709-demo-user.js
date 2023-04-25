'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
            yield queryInterface.bulkInsert('Users', [{
                    firstName: 'Super',
                    lastName: 'Admin',
                    email: 'superadmin@superadmin.com',
                    roleId: 1,
                    password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS",
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
                    password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS",
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
                    password: "$2y$10$5CGKRFgnzih.ef5zg8Z85.cU2Q4FR.91kWKINnKpe24uQW4hiQWlS",
                    verified: true,
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
            yield queryInterface.bulkDelete('Users', null, {});
        });
    }
};
