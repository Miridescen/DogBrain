// 该文件将返回结果进行包装，使输出格式化


let NO_LOG = -1;
let SUCCESS = 0;
let CHECKFAIL = 1;
let NO_PERMISSION = 2;
let UNKNOWN_EXCEPTION = 99;

let messages = {
    'NO_LOG': -1,
    'SUCCESS': 0,
    'CHECKFAIL': 1,
    'NO_PERMISSION': 2,
    'UNKNOWN_EXCEPTION': 99
}

// 接口状态吗，0=成功， >0表示已知异常， <0表示未知异常
var code = SUCCESS;

var data = {};

module.exports = {
    resultData: function resultData(index, pageSize, totalCount, datas, callback) {
        let obj = {
            code: SUCCESS,
            message: 'SUCCESS',
            count: datas.length,
            totalCount: totalCount,
            index: index,
            pageSize: pageSize,
            totalPage: Math.ceil(totalCount/pageSize),
            data: datas
        };
        callback(obj);
    },

    resultOneData: function resultOneData(data ,callback) {

        let obj = {
            code: SUCCESS,
            message: 'SUCCESS',
            data: data
        };
        callback(obj);

    }
}