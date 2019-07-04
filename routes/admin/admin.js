var express = require('express');
var router = express.Router();
var fs = require('fs');

var categoryDB = require('../../controller/categoryDB.js');


router.get('/', function(req, res, next) {

    // res.render('body/admin');

    res.render('X-admin/index', {title: 'HTML'});
});



module.exports = router;