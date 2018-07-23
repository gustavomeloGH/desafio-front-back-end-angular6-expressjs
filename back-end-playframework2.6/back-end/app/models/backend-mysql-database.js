/* ---------  REQUIRES   -----------*/
var mysql      = require('mysql');
var Utils      = require('../util/utils');


/* -----  CONFIGURATION DATABASE   -------*/
var connection = mysql.createConnection({
  connectionLimit : 2,
  host     : 'localhost',
  port     : '3306',
  database: "desafio_database",
  user     : 'root',
  password : '1111'
});


function DatabaseMySql() {  }

/* ---------  DATABASE - METHODS   -----------*/

DatabaseMySql.prototype.insert = function (usuario, callback) {

  var utils = new Utils();
  var sqlAddress = utils.getInsertSqlAddress(usuario.endereco);

  /* -- Start transation -- */
  //connection.connect();
  connection.beginTransaction(function(err) {
    if (err) { callback (null, err); }

    /* -- Start insert ADDRESS -- */
    insertSql(sqlAddress, function(resultAddress, err){
      if(err){
        connection.rollback();
        callback (null, err);
      } else {

        var sqlUser = utils.getInsertSqlUser(usuario, resultAddress.insertId);
      
        /* -- Start insert USER with PK from ADDRESS -- */
        insertSql(sqlUser, function(result, err){
          if(err){
            connection.rollback();
               callback (null, err);
            } else {
              connection.commit(function(err) {
                if (err) { 
                  connection.rollback();
                  callback (null, err);
                }

                console.log('Transaction Complete.');
                //connection.end();
                callback("Usuário inserido com sucesso!");

            });
          }
        });
      }
    });
  });

}


DatabaseMySql.prototype.getUser = function (email, callback) {
  
  var utils = new Utils();

  var sqlSelectUser = utils.getSqlSelectUser(email);

  connection.query(sqlSelectUser, function(err, resultUser) {
    if (err || resultUser.length == 0) {
      callback (null, err);
    } else {
      var sqlSelectAddress = utils.getSqlSelectAddress(resultUser[0].id_endereco);
      connection.query(sqlSelectAddress, function(err, resultAddress) {
        if (err) {
          callback (null, err);
        } else {
          callback(utils.generateUser(resultUser[0],resultAddress[0]));
        }
      });
    }
  });
}

 function insertSql(query, callback) {
   
  connection.query(query, function(err, result) {
    if (err) {
      callback (null, err);
    } else {
      callback(result)
    }
  });
 }



module.exports = DatabaseMySql;
