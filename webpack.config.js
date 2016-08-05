var webpack = require('webpack');
var environment = 'client';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack_conf = {};

for (var i = 0; i < process.argv.length; i++) {
  if(process.argv[i] === '--server') {
    environment = 'server';
  }
}
 
if(environment === 'client') {
  webpack_conf = {
    entry: './bulid/page.js',
    output: {
      filename: './public/js/bundle.js',
      comments: false  // remove all comments
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          query: {compact: false},
          loader: 'babel-loader'
        },
        { test: /\.jsx?$/, loaders: ['jsx-loader?harmony']},
        //{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
        // { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      ]
    },
    plugins: [ 
      // new webpack.optimize.CommonsChunkPlugin('commond.js'), 
      new ExtractTextPlugin("public/css/poem.css"), 
    ]
  };
}
else {
  webpack_conf = {
    entry: './bulid/page.js',
    output: {
      filename: './release/page_server.js',
      libraryTarget: "commonjs2",
      comments: false  // remove all comments
    },
    target: "node",
    // externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: [
        {
          test: /\.js$/,
          query: {compact: false},
          loader: 'babel-loader'
        },
        { test: /\.jsx?$/, loaders: ['jsx-loader?harmony']},
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      ]
    }
  };
}

module.exports = webpack_conf;
