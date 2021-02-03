const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define('Questions', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descrition:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() =>{
    console.log("Tabela criada!");
});

module.exports = Question;