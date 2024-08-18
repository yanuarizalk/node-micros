const { DataTypes, Model, ValidationError, QueryTypes } = require('sequelize')
const { db } = require('app');
const Material = require('./material');
const User = require('./user');

class Transaction extends Model {
    static withMaterials() {
        return this.sequelize.query(`
        SELECT 
            t.id, t.customerId, t.vendorId
            , JSON_ARRAYAGG(JSON_OBJECT('id', m.Id, 'name', m.Name)) AS materials
            , t.transactionDate, t.createdAt, t.updatedAt, t.deletedAt
        FROM ${this.tableName} t
        LEFT JOIN \`Materials\` m ON JSON_CONTAINS(t.materialIds -> '$[*]', CAST(m.Id AS JSON) )
        GROUP BY t.Id`, {
            type: QueryTypes.SELECT
        });
    }
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    materialIds: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    transactionDate: {
        type: DataTypes.DATEONLY,
    },
}, {
    sequelize: db, paranoid: true, validate: {
        sameUser() {
            if (this.customerId == this.vendorId)
                throw new ValidationError('unable to transact using same user of vendor & costumer');
        },
        async materialExistance() {
            if (!Array.isArray(this.materialIds))
                throw new ValidationError('invalid materialIds type');

            let existingData = await Material.findAll({
                where: {
                    id: this.materialIds
                }
            });

            this.materialIds.forEach((id) => {
                if (existingData.find((v) => v.id == id) == null)
                    throw new ValidationError(`material with id ${id} not found`);
            });
        }
    }
});

Transaction.belongsTo(User, {
    as: 'vendor',
    foreignKey: 'vendorId'
});
Transaction.belongsTo(User, {
    as: 'customer',
    foreignKey: 'customerId'
});

module.exports = Transaction