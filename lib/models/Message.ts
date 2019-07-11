import * as Sequelize from 'sequelize';

export class Message extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
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
        }, {
            tableName: 'messages',
            sequelize: sequelize
        })
    }
    static associate(models) {
        models.Chat.belongsTo(models.User, { as: 'user', foreignKey: 'id'})
        models.Chat.belongsTo(models.Chat, { as: 'chat', foreignKey: 'id'})
    }
}