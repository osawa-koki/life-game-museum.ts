const path = require('path')

module.exports = {
  entry: './public/index.ts',
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: './index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  }
}
