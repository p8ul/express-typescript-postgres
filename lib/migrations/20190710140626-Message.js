'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('messages', { 
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    sender_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    receiver_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    chat_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'chats',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
     });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');    
  }
};
