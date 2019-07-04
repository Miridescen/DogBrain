
var express = require('express');
var router = express.Router();
var fs = require('fs');

var result = require('../../tool/packagePort.js');

var categoryDB = require('../../controller/categoryDB.js');


router.post('/createOne.json', function (req, res, next) {

    var body = req.body;


    console.log(body);

    if (body.name != null && body.module != null) {
        categoryDB.createCategory(body.name, body.module, body.desc, function (category) {

            res.json({
                "code": 0,
                "message": "请求成功"
            })

        })
    } else {
        res.json({
            "code": -1,
            "message": "请求失败"
        })
    }

});

router.post('/list.json', function (req, res, next) {

    var body = req.body;

    var curIndex = Number.isNaN(parseInt(body.index)) ? 1 : parseInt(body.index);
    var curPageSize = Number.isNaN(parseInt(body.pageSize)) ? 10 : parseInt(body.pageSize);

    categoryDB.findCategoryForPage(curIndex, curPageSize, (count, datas)=>{
        result.resultData(curIndex, curPageSize, count, datas, (data)=>{
            res.json(data);
        })
    })
});


router.post('/removeOne.json', function (req, res, next) {

    var body = req.body;
    categoryDB.deleteCategoryById(body["id"], function () {
        res.json({
            "code": 0,
            "message": '删除成功'
        })
    })
});

router.post('/find.json', function (req, res, next) {
    var body = req.body;
    categoryDB.findCategoryByModule(body['module'], function (data) {
        result.resultOneData(data, function (result) {
            res.json(result);
        })
    })
})

module.exports = router;