var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

var multer  = require('multer');
var upload = multer();

var db = require('../controller/db.js');
var categoryDB = require('../controller/categoryDB.js');
var newsDB = require('../controller/newsDB.js');
var result = require('../tool/packagePort.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    db.findArtical(null, function (articals) {

        categoryDB.findCategoryByModule('推荐', function (categorys) {
            res.render('body/index.ejs', {articals:articals, categorys:categorys});
        })

    });

});

router.get('/artical/:articalID', function (req, res, next) {
    var articalID = req.params.articalID;
    // console.log(req.params);
    db.findArtical(articalID, function (artical) {

        console.log(artical);
        fs.readFile(`${__dirname}/../markdown/`+ artical.file_name, function (err, data) {
            if (err) {
                console.log(err);
            }
            var str = marked(data.toString());
            res.render('body/artical-show.ejs', { artical: artical, content:str});

        })

    })
});




module.exports = router;
