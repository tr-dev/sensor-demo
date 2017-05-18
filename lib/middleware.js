const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
module.exports = function(app) {


/*
* For development only
*/

  app.use(require("webpack-dev-middleware")(compiler, {

  }));

  app.use(require("webpack-hot-middleware")(compiler));

}
