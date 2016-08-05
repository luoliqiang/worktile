/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

if(typeof window !== 'undefined') {
    var Tasks = require('./main-tasks');
}

var Mainlayout = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div id="centerContent">
                <div id="js-task-wrapper">
                    <Tasks data={data}/>
                </div>
            </div>
        )
    }
});

module.exports = Mainlayout;


