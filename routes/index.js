var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

var multer  = require('multer');
var upload = multer();

var db = require('../controller/db.js');
var articalCategoryDB = require('../controller/articalCategoryDB.js');
var categoryDB = require('../controller/categoryDB.js');

// var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {

    db.findArtical(null, function (articals) {

        categoryDB.findCategoryByModule('推荐', function (categorys) {
            res.render('body/index', {articals:articals, categorys:categorys});
        })


    });

});

router.get('/category/:category', function (req, res, next) {
    var category = req.params.category;
    db.findArticalByCategory(category, function (articals) {

        articalCategoryDB.findArticalCategory(function (categorys) {
            res.render('body/index', {articals:articals, categorys:categorys});
        });
    })
})

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
