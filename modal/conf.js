var mysql  = require('mysql');
var config = require('../conf/conf').mysql;

//数据库连接池
var pool  = mysql.createPool(config);

var dell_db = {
    queryData: function(query_str, cb) {
        pool.getConnection(function(err, connection) {
            var query_data = '';

            connection.query(query_str, function(err, rows, fields) {
                if (err) throw err;
                cb(rows);
            });
            connection.release();
        });
    }
}

module.exports = dell_db;

//创建一张表
// $sql = 'CREATE TABLE poemUser('+    
//             'user_id INT NOT NULL AUTO_INCREMENT,'+
//             'user_name VARCHAR(100) NOT NULL,'+
//             'user_age VARCHAR(40) NOT NULL,'+
//             'PRIMARY KEY ( user_id )); ';

//插入数据
// $sql = 'INSERT INTO poemUser '+
//         '(user_name, user_age) '+
//         'VALUES '+
//         '("littlejohn2", "30"); '