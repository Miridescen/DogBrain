var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("连接数据库成功");
});

// 文章模型
var articalSchema = new mongoose.Schema({
    title: String,
    created_at: String,
    author: String,
    content: String,
    file_name: String,
    module: Array,
    category: Array
});
var articalModel = mongoose.model('artical', articalSchema);

// 用户模型
var userSchema = new mongoose.Schema({
    name: String,
    gender: String
});
var userModel = mongoose.model('user', userSchema);


//分类模型
var categorySchema = new mongoose.Schema({
   name: String,
   module: String,
    desc: String,
   created_at: String
});
var categoryModel = mongoose.model('category', categorySchema);

//信息流模型（首页数据）
var newsSchema = new mongoose.Schema({
    media: String,
    media_url: String,
    url: String,
    full_url: String,
    title: String,
    image_url: String

})
var newsModel = mongoose.model('news', newsSchema);


module.exports = {

    articalModel : articalModel,

    userModel : userModel,

    categoryModel : categoryModel,

    newsModel: newsModel


}

