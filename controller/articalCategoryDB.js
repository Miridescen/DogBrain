var modles = require('../model/models.js');
var moment = require('moment');

var articalCategoryModel = modles.artical_categoryModel;

module.exports = {

    createCategory : function createCategory(categoryName, callback) {
        var articalCategory = new articalCategoryModel({
            name: categoryName,
            created_at: moment().format("YYYY-MM-DD")
        });

        articalCategory.save(function (err, articalCategorys) {
            if (err) return console.log(err);
            callback(articalCategorys);
        });
    },

    findArticalCategory : function findArticalCategory(callback) {

        articalCategoryModel.find(function(err, articalCategorys) {
            if (err) return console.log(err);
            callback(articalCategorys);
        })

    }

}