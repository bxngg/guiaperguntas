const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'Beemo@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;