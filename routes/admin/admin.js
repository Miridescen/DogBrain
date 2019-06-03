var express = require('express');
var router = express.Router();
var fs = require('fs');

var categoryDB = require('../../controller/categoryDB.js');


router.get('/', function(req, res, next) {

    res.render('body/admin');
});

router.post('/createCategory', function (req, res, next) {

    var body = req.body;
    
    if (body.name != null && body.module != null) {
        categoryDB.createCategory(body.name, body.module, function (category) {
            console.log(category);
            res.render('body/admin');
        })
    }
    


});

module.exports = router;