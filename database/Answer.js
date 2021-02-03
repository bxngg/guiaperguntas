const Sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define("answers", {

    bodyAnswer: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    answerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

Answer.sync({force: false});

module.exports = Answer;
