const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: [
      "./src/app/assets/sass/app.scss",
      './src/app/assets/js/app.js',
    ],
    output: {
        path:path.resolve(__dirname, "./public/assets/js"),
        filename: 'app.js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        "$":"jquery",
        "jQuery":"jquery",
        "window.jQuery":"jquery"
      }),
    ],
    resolve: {
      alias: {
        // bind version of jquery-ui
        "jquery-ui": "jquery-ui/jquery-ui.js",
        // bind to modules;
        modules: path.join(__dirname, "node_modules"),
      },
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    devServer: {
        static: path.join(__dirname, "/")
    }
}
