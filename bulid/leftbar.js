var React = require('react');
var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    require("../public/less/p_sidebar.less");
}

var FastAddList = React.createClass({
    showAddtaskDialog: function() {
        PubSub.publish( 'show.addTaskDialog');
    },
    render: function() {
        return (
            <div className={this.props.showStatus == true? "fastadd-list-box": "fastadd-list-box hide"}>
                <ul>
                    <li><i className="fa fa-group"></i>团队</li>
                    <li><i className="fa fa-inbox"></i>项目</li>
                    <li onClick={this.showAddtaskDialog} className="line"><i className="fa fa-tasks"></i>任务</li>
                    <li><i className="fa fa-calendar-o"></i>日程</li>
                    <li><i className="fa fa-file"></i>文件</li>
                </ul>
            </div>
        );
    }
});

var LeftBar = React.createClass({
    getInitialState: function() {
        return {showStatus: false };
    },
    fastAdd: function() {
        var that = this;
        this.setState({showStatus: ! that.state.showStatus});
    },
    componentDidMount: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    render: function() {
        var that = this;
        return (
            <div id="sidebar" className="side-wrapper">
                <div className="lf-bar-avatar">
                    <img src="/images/avatar.jpg" />
                </div>
                <div className="lf-bar-nav-wrap">
                    <a className="lf-bar-nav-item cur" data-toggle="tooltip" title="工作台" data-placement="right" style={{whiteSpace: 'nowrap'}}>
                        <i className="icon-tasks fa fa-dashboard"></i>
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
                    <a className="lf-bar-nav-item lf-bar-nav-item-add">
                        <i className="icon-tasks fa fa-plus-circle" onClick={this.fastAdd} data-toggle="tooltip" title="快速新建" data-placement="right"></i>
                        <FastAddList showStatus={that.state.showStatus}/>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = LeftBar;