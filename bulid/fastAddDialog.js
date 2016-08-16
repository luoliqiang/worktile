var React = require('react');
var ReactDOM = require('react-dom');

var Textarea = React.createClass({
    handleChange: function(event) {
        this.props.getParams('taskName', event.target.value);
    },
    render: function() {
        return (
            <div>
                <textarea placeholder="请输入任务内容（按Enter 键直接保存并关闭）" onChange={this.handleChange}/>
                <p className="textarea-tip">粘贴多行文本可快速创建多条任务。（按 Shift + Enter 可手动换行）</p> 
            </div>
        )
    }
});

var Selecttype = React.createClass({
    getInitialState: function() {
        return {                 
            projectname: '个人项目',
            tasktype: 0,
            projectid: 1
        };
    },
    changeProject: function(event) {
        var project_id = event.target.getAttribute('data-projectid');
        var new_state = {
            projectname: event.target.innerText,
            projectid: project_id
        }
        this.refs.dropdown.className = 'dropdown';
        this.setState(new_state);
        this.props.getParams('projectId', project_id);
    },
    changeType: function() {
        var type = this.target.getAttribute('data-tasktype');
        this.setState({tasktype: type});
    },
    render: function() {
        var tasktypename = {
            0: '要做',
            1: '在做',
            2: '待定'
        }
        var tasktypenametxt = tasktypename[this.state.tasktype];
        return (
            <div className="item-wrap fix">
                <div className="item">
                    所属项目：
                    <div className="dropdown" ref="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-projectid={this.state.projectid}>
                            {this.state.projectname}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#" data-projectid="1" onClick={this.changeProject}>个人项目</a></li>
                            <li><a href="#" data-projectid="2" onClick={this.changeProject}>poem项目</a></li>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    任务列表：
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-tasktype="1">
                            {tasktypenametxt}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#" data-tasktype="0" onClick={this.changeType}>要做</a></li>
                            <li><a href="#" data-tasktype="1" onClick={this.changeType}>在做</a></li>
                            <li><a href="#" data-tasktype="2" onClick={this.changeType}>待定</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

var Signtype = React.createClass({
    getInitialState: function() {
        return { 
            lockStatus: 0
        };
    },
    changeLock: function(event) {
        var new_lock_status = Number(!this.state.lockStatus);
        this.setState({lockStatus: new_lock_status});
        this.props.getParams('taskLock', new_lock_status);
    },
    render: function() {
        var icon_class = this.state.lockStatus? 'fa fa-fw fa-lock': 'fa fa-fw fa-unlock';
        return (
            <div className="item-wrap fix">
                <div className="item">
                    分配给：
                    <div className="sign-add">
                        <span>＋</span>
                    </div>   
                </div>
                <div className="item">
                    <span data-tasklock="0" onClick={this.changeLock}>
                        <i className={icon_class}></i>锁定任务 
                    </span>
                </div>
            </div>
        )
    }
});

var DialogBox = React.createClass({
    getInitialState: function() {
        return { 
            showStatus: false
        };
    },
    componentDidMount: function() {
        var that = this;
        this.params = {

        };
        PubSub.subscribe( 'show.addTaskDialog', function() {
            var showStatus = that.state.showStatus;
            that.setState({showStatus: ! showStatus});
        });
        $('.modal-addTask .dropdown-toggle').dropdown();
    },
    componentWillUnmount: function() {
        var that = this;
        this.params = {};
        PubSub.unsubscribe( 'show.addTaskDialog');
    },
    closeDialog: function() {
        this.setState({showStatus: false});
    },
    getParams: function(key,val) {
        this.params[key] = val;
        console.log(this.params);
    },
    doSaveadd: function() {
        var params = this.params;
    },
    render: function() {
        return (
            <div className={this.state.showStatus? "modal modal-addTask show" : "modal modal-addTask fade hide"}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button onClick={this.closeDialog} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">新建任务</h4>
                  </div>
                  <div className="modal-body">
                        <Textarea getParams={this.getParams} />
                        <Selecttype getParams={this.getParams} />
                        <Signtype getParams={this.getParams} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onclick="{this.doSaveadd}">保存</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeDialog}>取消</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

module.exports = DialogBox;
