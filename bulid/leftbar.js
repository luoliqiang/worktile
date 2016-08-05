var React = require('react');
var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    require("../public/less/p_sidebar.less");
}

var TopBar = React.createClass({
    render: function() {
        return (
            <div id="sidebar" className="side-wrapper">
                <div className="lf-bar-avatar">
                    <img src="/images/avatar.jpg" />
                </div>
                <div className="lf-bar-nav-wrap">
                    <a className="lf-bar-nav-item cur" data-toggle="tooltip" title="工作台" data-placement="right">
                        <i className="icon-tasks fa fa-tasks"></i>
                    </a>
                    <a className="lf-bar-nav-item" data-toggle="tooltip" title="搜索" data-placement="right">
                        <i className="icon-tasks fa fa-search"></i>
                    </a>
                    <a className="lf-bar-nav-item" data-toggle="tooltip" title="消息" data-placement="right">
                        <i className="icon-tasks fa fa-bell-o"></i>
                    </a>
                    <a className="lf-bar-nav-item lf-bar-nav-item-gp" data-toggle="tooltip" title="团队" data-placement="right">
                        <i className="icon-tasks fa fa-group"></i>
                    </a>
                    <a className="lf-bar-nav-item" data-toggle="tooltip" title="项目" data-placement="right">
                        <i className="icon-tasks fa fa-cubes"></i>
                    </a>
                    <a className="lf-bar-nav-item lf-bar-nav-item-add" data-toggle="tooltip" title="快速新建" data-placement="right">
                        <i className="icon-tasks fa fa-plus-circle"></i>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = TopBar;