var modles = require('../model/models.js');

var moment = require('moment');

var newsModel = modles.newsModel;

module.exports = {

    findNews: function findNews(index, pageSize, callback) {

        newsModel.countDocuments((err, count) => {
            newsModel.find().sort({'_id':-1}).limit(pageSize).skip((index-1)*pageSize).exec(function(err,docs){
                if (err) return console.log(err);
                if (docs.length>0){
                    callback(count, docs);
                } else {
                    callback(0, []);
                }

            })
        })

    }
}