const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database")
const question = require("./database/Question")
const Answer = require("./database/Answer")

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//rotas
app.get("/", function(req, res){
    question.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    })
    // SELECT * FROM perguntas
});

app.get("/question", function(req, res){
    res.render("question");
});

app.get("/success", function(req, res) {
    res.render("success");
});

app.post("/savequestion", (req, res) => {
    var title = req.body.title;
    var  descrition = req.body.descrition

    console.log(req.body)
    question.create({
        title: title,
        descrition: descrition
    }).then(() => {
        res.redirect("/success")
    })
});


app.get("/questions/:id", (req, res) => {
    var id = req.params.id;

    question.findOne({
        where: {id: id}


    }).then(question => {
        if(question != undefined){ // pergunta
           
            Answer.findAll({
                where: {answerId: question.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(answer => {
                res.render("questions", {
                  question: question ,
                  answer: answer
                  
                });
                
            })
        }else{ // nao encontrada
            res.redirect("/");
        }
    });

app.post("/answersuccess", (req, res) =>{
    var bodyAnswer = req.body.bodyAnswer;
    var ansId = req.body.answerInput;
    console.log(req.body)

    Answer.create({
        bodyAnswer: bodyAnswer,
        answerId: ansId // usar a variavel, não o nome da coluna
    }).then(() => {
        res.redirect("/questions/" + ansId );
    });
});


});
app.listen(3000, ()=>{
    console.log('Estou online na porta 3000.');
});