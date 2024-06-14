const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
require('dotenv').config();

const port = process.env.REACT_APP_PORT || 3030

module.exports = (_, argv) => ({
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/web/component/CouponHost/"
  },

  ignoreWarnings: [/Critical dependency:/],

  stats: {
    children: true  // Esto mostrará más detalles sobre los errores en compilaciones secundarias
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "fetch": false,
    },
  },

  devServer: {
    port: port,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        use: {
          loader: 'url-loader?limit=100000'
        }
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "CouponHost",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./coupon": "/src/components/movusuComponents/searchCoupons.tsx"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
