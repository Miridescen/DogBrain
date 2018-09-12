
var modles = require('../model/models.js');

var moment = require('moment');

var articalModel = modles.articalModel;
module.exports = {

    insertOneArtical : function insertOneArtical(artical, callback) {

        var artical = new articalModel({
            title: artical.title,
            created_at: moment().format('YYYY-MM-DD'),
            author: artical.author,
            content: artical.content,
            file_name: artical.file_name,
            category: artical.categorys
        });

        artical.save(function (err, artical) {
            if (err) return console.log(err);

            callback(artical);
        });
    },

    findArtical : function findArtical(articalID, callback) {
        console.log(articalID);
        if (articalID == null) {

            articalModel.find().sort({'_id':-1}).limit(10).exec(function(err,docs){
                if (err) return console.log(err);
                callback(docs);
            })

        } else  {
            articalModel.findById(articalID, function (err, artical) {
                if (err) return console.log(err);
                callback(artical);
            });
        }

    },

    findArticalByCategory : function findArticalByCategory(categoryName, callback) {
        if (categoryName == null) return;

        console.log(categoryName);

        articalModel.find({category: { $elemMatch: {$eq:categoryName}} }).sort({'_id':-1}).limit(10).exec(function(err,docs){

            console.log(docs);

            if (err) return console.log(err);
            callback(docs);
        })
    }


};




