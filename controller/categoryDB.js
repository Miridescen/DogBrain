var models = require("../model/models.js");
var moment = require("moment");

var categoryModel = models.categoryModel;

module.exports = ({

    createCategory: function createCategory(categoryName, moduleName, desc, callback) {
        var category = new categoryModel({
            name: categoryName,
            module: moduleName,
            desc: desc,
            created_at: moment().format('YYYY-MM-DD')

        });

        category.save(function (err, category) {
            if (err) console.log(err);
            callback(category);
        })
    },

    findCategory: function findCategory(callback){
        categoryModel.find(function (err, results) {
            if (err) console.log(err);
            callback(results);
        })
    },

    findCategoryForPage: function findCategoryForPage(index, pageSize, callback){
        categoryModel.countDocuments((err, count)=>{

            if (err) return console.log('err = '+err);
            categoryModel.find().sort({'_id':-1}).limit(pageSize).skip((index-1)*pageSize).exec((err, docs) =>{
                if (err) return console.log('err = '+err);
                callback(count, docs);
            })
        })
    },

    findCategoryByModule: function findCategoryByModule(moduleName, callback) {

        categoryModel.find({module: moduleName}, function (err, results) {
            if (err)  return console.log(err);
            callback(results);
        })

    },

    deleteCategoryById: function deleteCategoryById(id, callback) {

        categoryModel.deleteOne({_id : id}, function (err) {
            if (err) return console.log(err);
            callback();
        })

    }

});