import * as Sequelize from 'sequelize';

export interface PropertyAttributes extends Sequelize.InstanceRestoreOptions {
    id?: number,
    name?: String,
}

export class Property extends Sequelize.Model {
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
            createdBy: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: 'created_by',
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            }
        }, {
            tableName: 'properties',
            sequelize: sequelize
        })
    }
    static associate(models) {
        models.Property.belongsTo(models.User, { as: 'user', foreignKey: 'id'})
    }
}