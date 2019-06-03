var models = require("../model/models.js");
var moment = require("moment");

var categoryModel = models.categoryModel;

module.exports = ({

    createCategory: function createCategory(categoryName, moduleName, callback) {
        var category = new categoryModel({
            name: categoryName,
            module: moduleName,
            created_at: moment().format('YY-MM-DD')

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

    findCategoryByModule: function findCategoryByModule(moduleName, callback) {

        categoryModel.find({'module': moduleName}, function (err, results) {
            if (err) console.log(err);
            callback(results);
        })

    }

});