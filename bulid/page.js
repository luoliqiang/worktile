/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Leftbar = require('./leftbar');
var Topbar = require('./topbar'); 
var Main = require('./main'); 
var FastAddDialog = require('./fastAddDialog'); 

if(typeof window !== 'undefined') {
    require("../public/less/p_main.less");
}

var componont_layout = function(data) {
    var Pagelayout = React.createClass({
        render: function() {
            var initData = data || this.props.data;
            return (
                <div className="wrapper">
                    <Topbar />
                    <Main data={initData} />
                    <Leftbar />
                    <FastAddDialog />
                </div>
            );
        }
    });

    return Pagelayout;
}

if(typeof window !== 'undefined') {
    var initData = JSON.parse(window.initData);
    var Pagelayout = componont_layout();

    ReactDOM.render(
        <Pagelayout data={initData}/>,
        document.getElementById('appContainer')
    );
}
else {
    module.exports = componont_layout;
}


