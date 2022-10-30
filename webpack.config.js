const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    // commons: ['bootstrap', './sass/main.scss'],
    index: ['./js/index.js'],
    expences: ['./js/expences.js'],
    about: ['./js/about.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: Infinity,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            return module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          }
        }
      }
    }
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
    watchFiles: ["src/pages/*.html"],
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
      template: "./pages/index.html",
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      optimize: {
        prefetch: true,
      },
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './pages/about.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      optimize: {
        prefetch: true,
      },
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      filename: 'expences.html',
      template: './pages/expences.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      optimize: {
        prefetch: true,
      },
      chunks: ['expences']
    })
  ]
}
