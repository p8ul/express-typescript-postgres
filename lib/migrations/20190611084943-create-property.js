'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('properties',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'created_by',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('properties');
  }
};
