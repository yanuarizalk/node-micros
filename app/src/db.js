const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: !(process.env.IS_PRODUCTION ?? false)
});