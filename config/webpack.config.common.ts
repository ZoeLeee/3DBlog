import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

const isDevelopment = process.env.NODE_ENV === "development";

const config: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
      config: [__filename],

      // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
      // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules", path.resolve(__dirname, "../src")],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "3D-Blog",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new ESLintPlugin({
      fix: true,
      lintDirtyModulesOnly: true,
    }),
    new webpack.DefinePlugin({
      "process.env": "{}",
      global: {}
    }),
    new WebpackBar({}),
  ],
};

export default config;
