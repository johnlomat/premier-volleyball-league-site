const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./assets/js/custom.js",
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "bundle.js",
    publicPath: "/assets/js/", // Public URL path to output directory
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
