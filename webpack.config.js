const path = require('path')

module.exports = {
  entry: ["babel-polyfill", path.join(__dirname, "/src/index.js")],
  mode:"production",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    publicPath: '/dist/',
    historyApiFallback: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        // // pathRewrite: {'^/api' : ''},
        // secure: false,
        // changeOrigin: true
      }
    }
  },
  resolve: {
       extensions: [".js", ".jsx"]
   }
};
