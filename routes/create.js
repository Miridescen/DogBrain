var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var marked = require('marked');

var db = require('../controller/db.js');
var articalCategoryDB = require('../controller/articalCategoryDB.js');




var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, '../markdown/')  //设定文件上传路径
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        console.log(file.originalname) //上传文件的名字
        console.log(file.mimetype)    //上传文件的类型
        console.log(file.fieldname) // 上传文件的Input的name名
        console.log(file.encoding)    // 编码方式
        var fileFormat = (file.originalname).split("."); //采用分割字符串，来获取文件类型
        console.log(fileFormat)
        var extname = path.extname(file.originalname); //path下自带方法去获取文件类型
        console.log(extname);
        // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]); //更改名字
        cb(null, file.originalname); //更改名字
    }
});
var upload = multer ({storage:storage})


/* 创建文章页 */

router.post('/', upload.array('articalFile',1),function (req, res, next) {

    var body = req.body;

    console.log(req.body);
    var file = req.files[0];

    var artical = {
        title: body.title,
        author: body.author,
        content: body.content,
        file_name: file.filename,
        categorys: Array(body.category)
    };

    db.insertOneArtical(artical, function (articals) {
        console.log(articals);
        articalCategoryDB.findArticalCategory(function (category){

            res.render('../views/create-artical/create-artical', {categorys: category});

        });
    });

});

router.get('/', function (req, res, next) {
    articalCategoryDB.findArticalCategory(function (category){

        res.render('../views/create-artical/create-artical', {categorys: category});

    });


});

module.exports = router;