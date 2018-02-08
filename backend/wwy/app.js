/**学生端入口**/

var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '981019',
    database : 'teaching_admin'
});
connection.connect();
var sql = 'SELECT * FROM students';
connection.query(sql,function (error,results) {
    var jsonResult;
    if (error){
        console.log('error : ' + error.message);
        jsonResult = {//返回json形式的数据
            "status" : "200",
            "message" : "success",
            data : null
        }
    }
    else {
        // results.forEach(printRows);
        jsonResult = {
            "status" : "200",
            "message" : "success",
            data : results
        }
    }
    // function printRows(currentResult){//该函数用来打印每一行的相关信息
    //     var keys = Object.keys(currentResult);//对象的长度不能用.length获取，要使用Object.keys()
    //     for(var i = 0;i < keys.length;i++){
    //         console.log(currentResult[keys[i]]);
    //     }
    // }
    app.get('/',function (req,res,next) {//用get来做数据查询，用post做数据添加修改或删除
        res.status(200).send(jsonResult);
        console.log(results);
        next();
    });
    app.use(function (err,req,res,next) {//返回错误信息
        console.log('Error happen : ' + err.stack);
        next();
    })
});
app.listen(3000);
