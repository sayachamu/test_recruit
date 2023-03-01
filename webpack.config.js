const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { htmlWebpackPluginTemplateCustomizer } = require("template-ejs-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/*
 * data
 */
const OUTPUT_ROOT = path.join(__dirname, "src/page");
const isProd = process.env.NODE_ENV === "production";
const config = {
  path: {
    ejs: {
      root: path.resolve(__dirname, "src/ejs/"),
      glob: path.resolve(__dirname, "src/ejs/**/*.ejs"),
    },
    scss: {
      root: path.resolve(__dirname, "src/assets/scss/"),
      glob: path.resolve(__dirname, "src/assets/scss/**/*.scss"),
      dist: OUTPUT_ROOT,
    },
    js: {
      root: path.resolve(__dirname, "src/assets/js/"),
      glob: path.resolve(__dirname, "src/assets/js/**/*.js"),
      dist: OUTPUT_ROOT,
    },
    img: {
      root: path.resolve(__dirname, "src/assets/images/**/*"),
    },
  },
};
// html file set
const templateData = glob
  .sync(config.path.ejs.glob, {
    ignore: ["**/_*.ejs"],
  })
  .map((file) => {
    return {
      filename: file
        .replace(config.path.ejs.root, ".")
        .replace(".ejs", ".html"),
      filepath: file,
    };
  });
// css entry
const cssEntries = Object.fromEntries(
  glob
    .sync(config.path.scss.glob, {
      ignore: ["**/_*.scss"],
    })
    .map((file) => {
      // SCSSファイル名をCSSファイル名に変換
      const cssName = file
        .replace(config.path.scss.root + "/", "")
        .replace(/\.scss$/, ".css");
      return [cssName, file];
    })
);
// js entry
const jsEntries = Object.fromEntries(
  glob
    .sync(config.path.js.glob, {
      ignore: ["**/_*.js"],
    })
    .map((file) => {
      const jsName = file
        .replace(config.path.js.root + "/", "")
        .replace(/\.js$/, "");
      return [jsName, file];
    })
);

// all entry
const entries = { ...jsEntries, ...cssEntries };

/*
 * helper
 */
const htmlGlobPlugins = (_entries) => {
  return Object.keys(_entries).map((key) => {
    return new HtmlWebpackPlugin({
      chunks: ["common", Object.keys(entries)[key], "style.css"], // ejsと同じ名前のjsを読み込む
      filename: _entries[key].filename,
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: _entries[key].filepath,

        htmlLoaderOption: {
          minimize: false, // html-loaderのminify設定
        },
        templateEjsLoaderOption: {
          data: {
            isProd: isProd,
            path: {
              img: config.path.img.root,
              scss: config.path.scss.root,
              js: config.path.js.root,
              ejs: config.path.ejs.root,
              distCss: config.path.scss.dist,
              distJs: config.path.js.dist,
            },
          },
        },
      }),
      inject: "head",
      minify: false, // html-webpack-pluginのminify設定
    });
  });
};

/*
 * setting
 */
let serve = {};
if (!isProd) {
  serve = {
    devServer: {
      watchFiles: ["src/**/*.ejs"],
      liveReload: true,
      hot: true,
      port: 3000,
      open: true,
      static: {
        directory: path.join(__dirname, "src"),
      },
    },
  };
}

const modules = {
  target: "web",
  mode: "development",
  stats: "errors-only",
  entry: entries,
  output: {
    path: OUTPUT_ROOT,
  },
  ...serve, // serve module
  devtool: isProd ? false : "inline-source-map",
  performance: {
    hints: isProd ? "error" : false,
  },
  plugins: [
    ...htmlGlobPlugins(templateData),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name]",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**",
        "!**/scss/**",
        "!**/ejs/**",
        "!**/js/**",
        "!/assets/**",
        "!/assets/images/**",
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "js/"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              sourceMaps: false,
            },
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.ejs$/i,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "template-ejs-loader",
          },
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: !isProd,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              // PostCSS でもソースマップを有効に
              sourceMap: !isProd,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: !isProd,
              sassOptions: {
                includePaths: [config.path.scss.root, OUTPUT_ROOT],
              },
            },
          },
        ],
      },
      {
        //拡張子がpng,jpg,gif,svgを検知したら
        test: /\.(png|jpg|jpeg|gif|svg)/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
    ],
  },
};

module.exports = modules;
