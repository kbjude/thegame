const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
     {
       test: /\.(png|svg|jpg|gif)$/,
       use: [
         'file-loader',
       ],
     },

     {
        test: /\.(mp3|mp4|wav)$/,
        use: [
          'file-loader',
        ],
      },

     {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env']
        }
        }
    }
    ],
  },
};
