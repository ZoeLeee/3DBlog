import webpack from "webpack";
import { Configuration } from "webpack-dev-server";
import merge from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import commonConfig from "./webpack.config.common";

const config: Configuration = merge(commonConfig, {
  mode: "development",
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
                // modifyVars: theme,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin({}), new ReactRefreshWebpackPlugin({ overlay: false })],
});

export default config;
