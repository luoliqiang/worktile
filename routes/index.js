var express = require('express');
var router = express.Router();
var query = require('../modal/query');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

router.get('/', function(req, res, next) {
    query.taskList(function(data) {
        var page = require('../release/page_server')(data);
        var htmls_main= ReactDOMServer.renderToString(React.createFactory(page)());
        var pate_left = require('../release/page_server')(data);
        res.render('layout', {component: htmls_main, userInfo: JSON.stringify(data)});
    });
});
router.get('/taskList', function(req, res, next) {
    query.taskList(function(data) {
        res.send({code: 0,data: data});
    });
});
router.post('/addTask', function(req, res, next) {
    var datas = req.body;
    query.setAddTask(datas, function(data) {
        res.send({code: 0});
    });
});
router.post('/deleteTask', function(req, res, next) {
    var datas = req.body.taskId;
    query.deleteTask(datas, function(data) {
        res.send({code: 0});
    });
});

module.exports = router;
