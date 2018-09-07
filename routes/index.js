var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');
var db = require('../controller/db.js');
var multer  = require('multer');
var upload = multer();


// var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {

    db.findArtical(null, function (articals) {
        res.render('body/index', {articals:articals});
    });

});

router.get('/artical/:articalID', function (req, res, next) {
    var articalID = req.params.articalID;
    // console.log(req.params);
    db.findArtical(articalID, function (artical) {

        console.log(artical);
        fs.readFile('markdown/'+ artical.file_name, function (err, data) {
            if (err) {
                console.log(err);
            }
            var str = marked(data.toString());
            res.render('body/artical-show', { artical: artical, content:str});

        })

    })
})

router.get('/archive', function (req, res, next) {

    db.findArtical(0, function (articals) {

        res.render('./body/artical-list', {articals:articals});
    });


});


module.exports = router;
