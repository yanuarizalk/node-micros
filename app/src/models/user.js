const { DataTypes, Model, Transaction } = require('sequelize')
const { db } = require('app')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            max: 255
        }
    }
}, { sequelize: db, paranoid: true });

module.exports = User