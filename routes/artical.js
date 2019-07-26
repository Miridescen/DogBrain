var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

var artical = require('../controller/articalDB.js');
var result = require('../tool/packagePort.js');




router.post('/list.json', function (req, res, next) {

    var body = req.body;

    var curIndex = Number.isNaN(parseInt(body.index)) ? 1 : parseInt(body.index);
    var curPageSize = Number.isNaN(parseInt(body.pageSize)) ? 10 : parseInt(body.pageSize);

    artical.findArtical(body.category, body.module, curIndex, curPageSize, (count, datas)=>{

        result.resultData(curIndex, curPageSize, count, datas, (data)=>{
            res.json(data);
        })

    })


})

router.post('/find/by/id.json', function (req, res, next) {
    var body = req.body;
    artical.findArticalByID(body.id, (datas)=>{


        var a = JSON.stringify(datas);
        var artObj = JSON.parse(a);

        fs.readFile(`${__dirname}/../markdown/`+ artObj.file_name, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var str = marked(data.toString());

            artObj['artical_content'] = str;

            res.json(artObj);

        })


    })
})

module.exports = router;