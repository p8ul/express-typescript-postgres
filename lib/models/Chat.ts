import * as Sequelize from 'sequelize';

export class Chat extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            owner_id: {
                allowNull: true,
                type: DataTypes.INTEGER,
                field: 'owner_id',
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            }
        }, {
            tableName: 'chats',
            sequelize: sequelize
        })
    }
    static associate(models) {
        models.Chat.belongsTo(models.User, { as: 'user', foreignKey: 'id'})
    }
}