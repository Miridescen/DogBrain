var express = require('express');
var router = express.Router();

var news = require('../controller/newsDB.js');

var result = require('../tool/packagePort.js');


router.post('/list.json', (req, res, next) =>{

    let body = req.body;

    var curIndex = Number.isNaN(parseInt(body.index)) ? 1 : parseInt(body.index);
    var curPageSize = Number.isNaN(parseInt(body.pageSize)) ? 10 : parseInt(body.pageSize);

    news.findNews(curIndex, curPageSize, function (totalCount, doc) {

        result.resultData(curIndex, curPageSize, totalCount, doc, (data)=>{
            res.json(data)
        })

    })


})

module.exports = router;
