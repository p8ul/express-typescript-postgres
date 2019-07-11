'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chat_users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    chat_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        field: 'chat_id',
        references: {
            model: 'chats',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
     });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chat_users');
  }
};
