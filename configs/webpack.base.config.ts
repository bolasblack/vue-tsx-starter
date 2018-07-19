import path from 'path'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import { ProvidePlugin, Configuration } from 'webpack'

export const ENV =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

// https://github.com/webpack/webpack/issues/2393
const filenameTemplate =
  ENV === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js'

export const config: Configuration = {
  mode: ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    mainFields: ['typescript:main', 'jsnext:main', 'module', 'main'],
    alias: {
      vue$: ENV === 'production' ? 'vue/dist/vue.min' : 'vue/dist/vue',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssSourceMap: false,
          loaders: {
            ts: 'babel-loader!ts-loader',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: {
          test: path.resolve(__dirname, '../node_modules'),
        },
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              import: false,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              import: false,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(svg|svgz|png|jpg|jpeg|gif|eot|ttf|woff|woff2)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: filenameTemplate,
    chunkFilename: filenameTemplate,
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime',
    }),
  ],
}

export default config
