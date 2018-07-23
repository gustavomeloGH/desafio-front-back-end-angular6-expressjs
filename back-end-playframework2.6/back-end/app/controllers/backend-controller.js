/* ---------  REQUIRES   -----------*/

var Address = require('../entities/address');
var User = require('../entities/user');
var DAOMySql = require('../models/backend-mysql-database');


/* ---------  CONTROLLERS - METHODS   -----------*/

function BackendController() { }

BackendController.prototype.insert = function (req, callback) {

    var addressUser = new Address(req.endereco.cep, 
                              req.endereco.logradouro, 
                              req.endereco.cidade, 
                              req.endereco.estado);

    var user = new User(req.nome, 
                        req.email,
                        req.senha,
                        req.dataNascimento,
                        addressUser);
    
    var daoMsql = new DAOMySql();

    daoMsql.insert(user, function(result, err) { 
        if (err) {
            callback (null, err);
        } else {
            callback(result)
        }
    })
}

BackendController.prototype.auth = function(req, callback){
    
    var daoMsql = new DAOMySql();
    
    daoMsql.getUser(req.email,  function(result, err) { 
        
        if (err || !result) {
            callback(null, err);
            } else {
                if ( result.senha == req.senha ) {
                    callback(result);
                } else {
                    callback(null, err);
                }
            }

        });
}

    

module.exports = BackendController;
