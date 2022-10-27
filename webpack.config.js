const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = ['about', 'expences'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    chunks: [`${name}`]
  })
});

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchFiles: ["src/*.html"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'assets/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Expence Tracker',
      filename: "index.html",
      template: "src/template.html",
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      optimize: {
        prefetch: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/pages/about.html',
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      filename: 'expences.html',
      template: 'src/pages/expences.html',
      chunks: ['expences']
    })
  ]
}
