import * as Sequelize from 'sequelize';

export class ChatUser extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                allowNull: true,
                type: DataTypes.INTEGER,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            chat_id: {
                allowNull: true,
                type: DataTypes.INTEGER,
                field: 'chat_id',
                references: {
                    model: 'chats',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            }
        }, {
            tableName: 'chat_users',
            sequelize: sequelize
        })
    }
    static associate(models) {
        models.Chat.belongsTo(models.User, { as: 'user', foreignKey: 'id'})
        models.Chat.belongsTo(models.Chat, { as: 'chat', foreignKey: 'id'})
    }
}