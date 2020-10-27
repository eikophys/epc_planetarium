const path = require('path');
const MODE = "development";
const enabledSourceMap = MODE === "development";

module.exports = {
  // production / development
  mode: MODE,
  // watch: true,

  entry: './src/ts/main.ts',

  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'dist')
  },
  watchOptions: {
    poll: true,
  }
};