/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    require("../public/less/p_tasks.less");
}

var TaskList = React.createClass({
    selectEvent: function(event) {
        var that = this;
        if(event.target.className.indexOf('fa-square-o') != -1) {
            event.target.className = 'fa fa-check-square-o pull-left';
            event.target.parentNode.className = 'tk-item animate-line-through';
            var task_id = event.target.getAttribute('data-taskid');
            setTimeout(function() {
                that.deleteTask(task_id);
            }, 1000);
        }
        else {
            event.target.className = 'fa fa-square-o pull-left';
        }
    },
    deleteTask: function(task_id) {
        var that = this;
        $.ajax({
            url: '/deleteTask',
            method: 'POST',
            data: {taskId: task_id}
        })
        .done(function(res) {
            if(res.code == 0) {
                that.props.doDelete(task_id);
            }
        });
    },
    render: function () {
        var that = this;
        var createItem = function(taskcontent) {
            return (
                <div className={"tk-item"} key={taskcontent.task_id}>
                    <i className="fa fa-square-o pull-left" onClick={that.selectEvent} data-taskid={taskcontent.task_id}></i>
                    <div className="cont-right" taskid="sdf">
                        {taskcontent.task_name}
                    </div>
                </div>
            )
        }
        var taskItems = this.props.data.map(createItem);
        return (
            <div className="tk-list">
                {taskItems}
            </div>
        );
    }
});
var AddTask = React.createClass({
    addItem: function(event) {
        if(this.refs.taskcontent.className === 'add-task-textarea hide') {
            this.refs.taskcontent.className = 'add-task-textarea';
        }
        else {
            this.refs.taskcontent.className = 'add-task-textarea hide';
        }
        this.refs.taskTextarea.value = '';
        this.refs.addTaskBtn.className = 'add-task hide';
        this.refs.taskTextarea.focus();
    },
    doSave: function(event) {
        var text = this.refs.taskTextarea.value.trim();
        var that = this;
        if(text == '') {
            return;
        }
        
        this.refs.taskTextarea.value = '';
        this.refs.taskTextarea.focus();
        $.ajax({
            url: '/addTask',
            method: 'POST',
            data: {taskName: text}
        })
        .done(function(res) {
            if(res.code == 0) {
                that.props.getTasks();
            }
        });
    },
    cancel: function() {
        this.refs.taskcontent.className = 'add-task-textarea hide';
        this.refs.addTaskBtn.className = 'add-task';
    },
    render: function () {
        return (
            <div className="add-task-box">
                <div className="add-task" onClick={this.addItem} ref="addTaskBtn">
                    <i className="icon-tasks fa fa-plus-circle"></i> 新建任务
                </div>
                <div className="add-task-textarea hide" ref="taskcontent">
                    <textarea className="form-control" placeholder="请输入任务内容" ref="taskTextarea"></textarea>
                    <div className="btns">
                        <div className="btn btn-success" onClick={this.doSave} title="保存">保存</div>
                        <div className="btn btn-cancel" onClick={this.cancel} ref="cancelTaskBtn" title="取消">取消</div>
                    </div>
                </div>
            </div>
        );
    }
});
var TaskWrapper = React.createClass({
    getInitialState: function() {
        var initData = this.props.data || {},
            task_data_arr = [];

        for (var i = 0; i < initData.length; i++) {
            task_data_arr.push({task_name: initData[i].task_name, task_id: initData[i].task_id});
        }
        return { data: task_data_arr };
    },
    getTasks: function() {
        var that = this;
        $.ajax({
            url: '/taskList'
        })
        .done(function(res) {
            if(res.code == 0) {
                that.setState({data: res.data});
            }
        });
    },
    doAdd: function(content) {
        var tk_content = this.state.data;
        var new_tk_content = tk_content.concat([content]);
        this.setState({data: new_tk_content});
    },
    doDelete: function(task_id) {
        var tk_content = this.state.data;
        for (var i = 0; i < tk_content.length; i++) {
            if(tk_content[i].task_id == task_id) {
                tk_content.splice(i,1);
            }
        }
        this.setState({data: tk_content});
    },
    render: function() {
        return (
            <div className="task-wrapper">
                <p className="task-title">要做</p>
                <TaskList data={this.state.data} doDelete={this.doDelete}/>
                <AddTask onAdd={this.doAdd} getTasks={this.getTasks}/>
            </div>
        );
    }
});

module.exports = TaskWrapper;