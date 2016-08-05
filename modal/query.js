var query_conf = require('./conf');

var userInfo = function(cb) {
    var $sql = 'SELECT * FROM poemUser ';
    query_conf.queryData($sql, function(data) {
        cb(data);
    });
}
var taskList = function(cb) {
    var $sql = 'SELECT * FROM poemTasks ';
    query_conf.queryData($sql, function(data) {
        cb(data);
    });
}
var setAddTask = function(save_data,cb) {
    //判断当前表是否存在
    var $sql_check = 'SHOW TABLES LIKE "%poemTasks%"';

    query_conf.queryData($sql_check, function(data) {
        if(data.length > 0) {
            var $sql = 'INSERT INTO poemTasks '+
                       '(task_name, task_create_date) '+
                       'VALUES '+
                       '("'+ save_data.taskName +'", NOW()); ';
            query_conf.queryData($sql, function(data) {
                cb(data);
            });
        }
        else {
            var $sql = 'CREATE TABLE poemTasks('+    
                        'task_id INT NOT NULL AUTO_INCREMENT,'+
                        'task_name VARCHAR(100) NOT NULL,'+
                        'utask_create_date DATE,'+
                        'PPRIMARY KEY (task_id)); ';
            query_conf.queryData($sql, function(data) {
                setAddTask(save_data, cb);
            });
        }
    });
}

var deleteTask = function(task_id,cb) {
    var $sql = 'DELETE FROM poemTasks WHERE task_id='+ task_id;
    query_conf.queryData($sql, function(data) {
        cb(data);
    });
}

module.exports = {
    userinfo: userInfo,
    taskList: taskList,
    setAddTask: setAddTask,
    deleteTask: deleteTask
}
