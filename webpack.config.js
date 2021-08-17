const path = require('path'); // Node.js 核心模块，用于操作文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].bundle.js', // [hash]避免快取 每次打包改檔名不一樣
    // assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    alias: { // 別名設置
      '@': path.resolve(__dirname, '/src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist') // server在哪執行
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                ],
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]' // 局部指定输出位置
        }
      },
    ],
  },
  devtool: 'source-map', // 方便debug
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: './src/main.html'
      }
    ),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css'
    }),
    new CleanWebpackPlugin(),
  ],
};
