'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tutorials', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.BOOLEAN
            },
            price: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            published: {
                type: Sequelize.BOOLEAN
            },
            userId: {
                type: Sequelize.BIGINT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tutorials');
    }
};