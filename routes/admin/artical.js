var express = require('express');
var router = express.Router();

var path = require('path');
var multer  = require('multer');

var artical = require('../../controller/articalDB.js');

var result = require('../../tool/packagePort.js');

var fs = require('fs');
var marked = require('marked');

var storage = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../markdown`)  //设定文件上传路径
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {

        // console.log(file.originalname); //上传文件的名字
        // console.log(file.mimetype);    //上传文件的类型
        // console.log(file.fieldname); // 上传文件的Input的name名
        // console.log(file.encoding);    // 编码方式
        var fileFormat = (file.originalname).split("."); //采用分割字符串，来获取文件类型
        // console.log(fileFormat);
        var extname = path.extname(file.originalname); //path下自带方法去获取文件类型
        // console.log(extname);
        cb(null, fileFormat[0] + '-' + Date.now() + extname); //更改名字
        // cb(null, file.originalname); //更改名字
    }
});
var upload = multer ({storage:storage});

router.post('/createOne.json', upload.array('articalFile', 1),function (req, res, next) {
    var file = req.files[0];

    var body = req.body;

    fs.readFile(`${__dirname}/../../markdown/`+ file.filename, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var str = marked(data.toString());

        var artical1 = {
            title: body.name,
            author: body.author,
            content: body.content,
            file_name: file.filename,
            category: Array(body.category),
            module: Array(body.module),
            detail: str
        };

        artical.createArtical(artical1, function (artical) {

            fs.unlink(`${__dirname}/../../markdown/`+ file.filename, function(err){
                if(err){
                    throw err;
                }
                console.log('文件:删除成功！');
            })

            result.resultOneData(artical, function (data) {
                res.json(data);
            });


        });

    })




});

router.post('/deleteOne.json', function (req, res, next) {
    let body = req.body;

    console.log(body);
    var id = body['id'];

    artical.deleteArticalByID(id, function (artical) {

        var file_name = artical['file_name'];
        if (typeof (file_name) != 'undefined') {
            fs.stat(`${__dirname}/../../markdown/`+file_name, function (err, stat) {
                if (err) {
                    console.log(err);
                    res.json({
                        "code": 0,
                        "message": '删除成功'
                    });
                } else {
                    fs.unlink(`${__dirname}/../../markdown/`+file_name, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        res.json({
                            "code": 0,
                            "message": '删除成功'
                        });
                    });
                }


            })
        }


    })
});

router.post('/list.json', function (req, res, next) {

    let body = req.body;

    var index = body.index;
    var pageSize = body.pageSize;

    var curIndex = Number.isNaN(parseInt(index)) ? 1 : parseInt(index);
    var curPageSize = Number.isNaN(parseInt(pageSize)) ? 10 : parseInt(pageSize);

    artical.findArticalForPage(curIndex, curPageSize, function (totalCount, datas) {

        result.resultData(curIndex, curPageSize, totalCount, datas, function (data) {
            res.json(data);
        })
    })

});

module.exports = router;

