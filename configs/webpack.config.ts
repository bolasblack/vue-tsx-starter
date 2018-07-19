import sh from 'shelljs'
import path from 'path'
import webpack, { Configuration } from 'webpack'
import webpackMerge from 'webpack-merge'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import baseConfig, { ENV } from './webpack.base.config'

sh.config.silent = true
const gitRevExecResult = sh.exec('git rev-parse --short HEAD')
if (gitRevExecResult.code !== 0) {
  console.error(
    'git rev-parse --short HEAD execute failed: \n' + gitRevExecResult.stderr,
  )
  process.exit(0)
}
const gitTagExecResult = sh.exec('git describe --tags')

export default webpackMerge(baseConfig, {
  devtool: false,
  entry: path.resolve(__dirname, '../src/main.ts'),
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      inject: 'head',
      chunks: ['main'],
    }),
    new CopyWebpackPlugin([
      {
        from: './assets',
        to: '.',
        ignore: ['index.html'],
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${ENV}"`,
      'process.env.DEPLOY_TIME': Date.now(),
      'process.env.GIT_TAG': JSON.stringify(gitTagExecResult.stdout.trim()),
      'process.env.GIT_REV': JSON.stringify(gitRevExecResult.stdout.trim()),
    }),
    new webpack.NamedModulesPlugin(),
    ENV === 'production' ? new UglifyJSPlugin({ sourceMap: true }) : undefined,
  ].filter(a => a) as Configuration['plugins'],
})
