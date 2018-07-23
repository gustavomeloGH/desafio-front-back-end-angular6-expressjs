/* ---------  REQUIRES   -----------*/

var Address = require('../entities/address');
var User = require('../entities/user');

/* ------ UTILS FUNCTIONS ------- */

function Utils () { }

Utils.prototype.getInsertSqlUser = function(usuario, idEndereco) {
	
    var sqlUser =   "INSERT INTO tbl_usuario (nome, email, senha, data_nascimento, id_endereco) VALUES (" +
        "'" + usuario.nome           + "', " + 
        "'" + usuario.email          + "', " + 
        "'" + usuario.senha          + "', " +
        "'" + usuario.dataNascimento + "', " +
            + idEndereco             + ")";
    return sqlUser;
}

Utils.prototype.getInsertSqlAddress = function(endereco) {
    
    var sqlAddress = "INSERT INTO tbl_endereco (cep, cidade, estado, logradouro) VALUES (" + 
        "'" + endereco.cep         + "', " + 
        "'" + endereco.cidade      + "', " + 
        "'" + endereco.estado      + "', " +
        "'" + endereco.logradouro  + "')";

    return sqlAddress;
}


Utils.prototype.getSqlSelectUser = function(email) {
    
    var sqlSelectUser= "SELECT * FROM  tbl_usuario WHERE email like '" + email + "'";;
    
    return sqlSelectUser;
};


Utils.prototype.getSqlSelectAddress = function(idEndereco) {
    
    var sqlSelectAddress= "SELECT * FROM  tbl_endereco WHERE id_endereco like '" + idEndereco + "'";;
    
    return sqlSelectAddress;
};


Utils.prototype.generateUser = function(resultUser, resultAddress) {
    var user = null;
    if(resultUser && resultAddress) {
        var addressUser = new Address(resultAddress.cep, 
            resultAddress.logradouro, 
            resultAddress.cidade, 
            resultAddress.estado);

        user = new User(resultUser.nome, 
            resultUser.email,
            resultUser.senha,
            resultUser.data_nascimento,
            addressUser);
    } 
    return user;
};

module.exports = Utils;