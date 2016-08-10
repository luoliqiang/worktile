var React = require('react');
var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    require("../public/less/p_topbar.less");
}

var TopBar = React.createClass({
    render: function() {
        return (
            <div id="topbar">
                <div className="tk-console">
                    <i className="icon-tasks fa fa-dashboard"></i>
                    <h3 className="top-tk-title">工作台</h3>
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
            </div>
        );
    }
});

module.exports = TopBar;