/*修改密码模块*/
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended : false}));

var dbConnection = require('./db_connection');
var connection = dbConnection.connectMysql(mysql);
connection.connect();

var appHeader = require('./set_header');
appHeader.setHeader(app);

app.post('/change_password',function (req,res,next) {
    var username = "'" + req.body.username + "'";
    var password = "'" + req.body.password + "'";
    var newPassword = "'" + req.body.newPassword + "'";
    var sql = 'SELECT * FROM accounts WHERE username = ' + username + 'AND password = ' + password;//只有当当前用户名与当前密码匹配成功了才能修改密码
    console.log('sql',sql);
    var jsonResult;
    connection.query(sql,function (error,result) {
        if(result == ''){//判断用户名与密码是否相等
            jsonResult = {
                "status" : "200",
                "message" : '0',
                data : null
            }
        }else {//相等执行修改密码操作
            if(newPassword.length >= 6 && newPassword.length <= 30){//密码长度大于6,且不大于30，继续执行
                sql = 'UPDATE accounts SET password = ' + newPassword + ' WHERE username = ' + username;
                connection.query(sql,function (error,result) {
                    if(error){
                        jsonResult = {
                            "status" : "200",
                            "message" : '0',
                            data : null
                        }
                    }else {
                        jsonResult = {
                            "status" : "200",
                            "message" : 'success',
                            data : null
                        }
                    }
                });
            }else {
                jsonResult = {
                    "status" : "200",
                    "message" : '密码长度不够',
                    data : null
                }
            }
        }
        res.status(200).send(jsonResult);
        next();
    });
});
app.listen(3000);