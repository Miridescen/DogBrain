var modles = require('../model/models.js');

var moment = require('moment');

var articalModel = modles.articalModel;
module.exports = {

    createArtical: function createArtical(artical, callback){
        var artical_model = new articalModel({
            title: artical.title,
            created_at: moment().format('YYYY-MM-DD'),
            author: artical.author,
            content: artical.content,
            file_name: artical.file_name,
            category: artical.category,
            module: artical.module
        });

        artical_model.save(function (err, artical) {
            if (err) return console.log(err);

            callback(artical);
        });
    },

    findArticalByID : function findArticalByID(articalID, callback) {
        console.log(articalID);
        articalModel.find({_id: articalID}).exec(function(err,docs){
            if (err) return console.log(err);
            if (docs.length>0){
                callback(docs[0]);
            } else {
                return;
            }

        })

    },

    findArticalByCategory : function findArticalByCategory(categoryName, callback) {
        if (categoryName == null) return;

        console.log(categoryName);

        articalModel.find({category: { $elemMatch: {$eq:categoryName}} }).sort({'_id':-1}).limit(10).exec(function(err,docs){

            console.log(docs);

            if (err) return console.log(err);
            callback(docs);
        })
    },

    findArticalByModule: function findArticalByModule(module, index, pageSize, callback){
        if (module == null) return;

        console.log(module);


        articalModel.countDocuments({module: { $elemMatch: {$eq:module}} }, (err, count)=>{

            if (err) return console.log('err = '+err);
            articalModel.find({module: { $elemMatch: {$eq:module}} }).sort({'_id':-1}).limit(pageSize).skip((index-1)*pageSize).exec(function (err, docs) {

                if (err) return console.log('err = '+err);
                callback(count, docs);
            })
        })
    },

    findArticalForPage: function findArticalForPage(index, pageSize, callback) {

        articalModel.countDocuments((err, count)=>{

            if (err) return console.log('err = '+err);
            articalModel.find().sort({'_id':-1}).limit(pageSize).skip((index-1)*pageSize).exec(function (err, docs) {

                if (err) return console.log('err = '+err);
                callback(count, docs);
            })
        })
    },

    findArtical: function findArtical(category, module, index, pageSize, callback) {

        var query = {};
        if (typeof category != "undefined") {
            query['category'] = { $elemMatch: {$eq:category}}
        }
        if (typeof module != "undefined") {
            query['module'] = { $elemMatch: {$eq:module}}
        }


        // {module: { $elemMatch: {$eq:module}}, category: { $elemMatch: {$eq:category}}}
        articalModel.countDocuments(query, (err, count)=>{

            if (err) return console.log('err = '+err);
            articalModel.find(query).sort({'_id':-1}).limit(pageSize).skip((index-1)*pageSize).exec(function (err, docs) {

                if (err) return console.log('err = '+err);
                callback(count, docs);
            })
        })
    },

    deleteArticalByID: function deleteArticalByID(id, callback) {

        console.log(id);
        articalModel.findByIdAndRemove(id, function (err, artical) {
            if (err) return console.log(err);
            callback(artical);
        })
    }


};