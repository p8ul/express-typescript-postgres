'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users',{
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'username',
      unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
