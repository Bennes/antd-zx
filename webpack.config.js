const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (config, env) => {
//	console.log(config.module.rules[3]);
//	console.log(JSON.stringify(config.module.rules[3]));
	
	//config.module.loaders[0].exclude.push(/\.ejs$/);    // ע 1
  if (env === 'production') {
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].async.js';
//    config.output.chunkFilename = '[chunkhash].async.js';
//    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css');    // ע 2
    config.plugins.push(
      new HtmlWebpackPlugin({
      	template:"src/html/index.ejs",
        filename:'index.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","login"],
        minify: { collapseWhitespace: true },
        production: true
      }),
      new HtmlWebpackPlugin({
      	template:"src/html/index.ejs",
        filename:'register.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","register"],
        minify: { collapseWhitespace: true },
        production: true
      }),
      new HtmlWebpackPlugin({
      	template:"src/html/main.ejs",
        filename:'main.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","index"],
        minify: { collapseWhitespace: true },
        production: true
      })
    );
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
      	template:"src/html/index.ejs",
        filename:'index.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","login"],
        hash:true
      }),
      new HtmlWebpackPlugin({
      	template:"src/html/index.ejs",
        filename:'register.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","register"],
        hash:true
      }),
      new HtmlWebpackPlugin({
      	template:"src/html/main.ejs",
        filename:'main.html',
 				title:"Json Mock平台",
 				inject:true,
        chunks: ["common","index"],
        hash:true
      })
    );
  }
  return config;
}
