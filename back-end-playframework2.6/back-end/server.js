/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Gustavo Melo
 */
 
//Base do Setup da Aplicação:
 
/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express     = require('express'); //chamando o pacote express
var app         = express(); //definção da nossa aplicação através do express
var bodyParser  = require('body-parser');  //chamando o pacote body-parser
 
/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000; 
 
//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
  

//Rotas da nossa API:
//==============================================================
 
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router = express.Router();
 
/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function(req, res, next) {
    console.log('Requisição Efetuada..');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);
app.use('/api', require('./app/routers/backend-routers'));
