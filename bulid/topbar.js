var React = require('react');
var ReactDOM = require('react-dom');

var TopBar = React.createClass({
    render: function() {
        return (
            <div className="tk-console">
                <i className="icon-tasks fa fa-tasks"></i>
                <h3 className="top-tk-title">工作dd台</h3>
                <div className="top-tk-tabs">
                    <div className="tab cur">我的任务</div>
                    <div className="tab">我的日程</div>
                    <div className="tab">最新动态</div>
                    <div className="tab">我的邮件</div>
                </div>
                <div className="top-tk-finesh-btn pull-right">
                    查看已完成任务
                </div>
            </div>
        );
    }
});