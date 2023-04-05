import type webpack from "webpack";

import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import "webpack-dev-server";

import common from "./webpack.common";

const config: webpack.Configuration = merge(common, {
    devtool: false,
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});

export default config;
