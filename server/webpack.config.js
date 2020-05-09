const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: fs.readdirSync(__dirname).reduce(
    (entries, dir) => {
      const fullDir = path.join(__dirname, dir);
      const entry = path.join(fullDir, "app.ts");
      if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = [
          "webpack-hot-middleware/client",  //添加用于热更新的文件
          entry
        ];
      }
      return entries;
    }, {}
  ),
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/__build__/"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader"
          }
        ]
      },
      {
        test:/\.tsx?$/,
        use:[
          {
            loader: "ts-loader",
            options: {
              transpileOnly:true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热更新
    new webpack.NoEmitOnErrorsPlugin()   //报错用的
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
