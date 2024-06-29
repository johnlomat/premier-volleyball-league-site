const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/custom.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "body",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff"),
          to: path.resolve(__dirname, "assets/css/fonts"),
        },
        {
          from: path.resolve(__dirname, "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2"),
          to: path.resolve(__dirname, "assets/css/fonts"),
        },
      ],
    }),
  ],
};
