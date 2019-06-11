import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcryptjs';
export interface UserAttributes extends Sequelize.InstanceRestoreOptions {
    id?: String,
    active?: boolean,
    username?: String,
    email?: String,
    password?: String,
    generateHash?: (arg: String)=> any,
}
export class User extends Sequelize.Model {
    public password;
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'username'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'email'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
        }, {
            tableName: 'users',
            sequelize: sequelize,
            hooks: {
                beforeCreate: async (user: User, options) => {
                    user.password = await bcrypt.hashSync(user.password.toString(), bcrypt.genSaltSync(8), null); 
                }
            }            
        }
        )
    }  
    
    static associate(models) {
        models.User.hasMany(models.Property, { as: 'property', foreignKey: 'id'})
    }

}
