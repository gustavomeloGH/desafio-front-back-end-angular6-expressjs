/* ---------  REQUIRES   -----------*/
var express = require('express');
var Usuario = require('../entities/user');
var BackendController = require('../controllers/backend-controller');

var router = express.Router();
var backendController = new BackendController();


/* ---------  ROUTERS - POST METHODS   -----------*/


router.route('/addUser').post(function (req, res) {
    backendController.insert(req.body, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});


/* ---------  ROUTERS - GET METHODS   -----------*/

router.route('/auth').post(function (req, res) {
    
    backendController.auth(req.body, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }

    });
});


/*--- END ROTAS ALERTMEDICINES--*/
module.exports = router;