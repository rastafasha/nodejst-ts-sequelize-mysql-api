'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            text: {
                type: Sequelize.TEXT
            },
            productId: {
                type: Sequelize.BIGINT
            },
            tutorialId: {
                type: Sequelize.BIGINT
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
        await queryInterface.dropTable('comments');
    }
};