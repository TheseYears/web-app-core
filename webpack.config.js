const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'web-app-core.js',
    library: 'web-app-core',
    libraryTarget: 'umd'
  },
  externals: [
    'vue'
  ],
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/style/main.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/style/var/variable.styl", to: "assets/style/variable" }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // 'vue-style-loader',
          // 'style-loader',
          'css-loader',
          {
            loader:'stylus-loader',
            options: {
              'import': [
                path.resolve(__dirname, './src/assets/style/var/variable.styl')
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 500 * 1024
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]', // 处理结果将保持原文件名，文件路径后添加哈希值避免缓存
            }
          }
        ]
      },
      {
        test: /\.(mp3|wav|wma|ape|aac)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]', // 处理结果将保持原文件名，文件路径后添加哈希值避免缓存
            }
          }
        ]
      }
    ]
  }
}
