
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
            file_name: artical.file_name
        })

        artical.save(function (err, artical) {
            if (err) return console.log(err);

            callback(artical);
        })
    },

    findArtical : function findArtical(articalID, callback) {
        console.log(articalID);
        if (articalID == null) {
            articalModel.find(function (err, artical) {
                if (err) return console.log(err);
                callback(artical);

            })

        } else  {
            articalModel.findById(articalID, function (err, artical) {
                if (err) return console.log(err);
                callback(artical);
            });
        }

    }


};




