// $ npm install -D --save webpack babel-core babel-loader babel-preset-es2015 babel-preset-stage-0
//
// $ webpack-dev-server --inline
//
// # .babelrc
//
//  {
//    'presets': ['es2015', 'stage-0']
//  }
//

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/dens',

  output: {
    path: './build',
    filename: 'dens.js',
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include: 'src' }
    ]
  },

  devServer: {
    port: 3003,
    host: '0.0.0.0',
  },

  devtool: isDev ? 'cheap-module-eval-source-map' : null
}
