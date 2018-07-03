/**
 * Created by 132 on 2018/7/2.
 */
// const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglify-js-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    devtool:'null',
    entry:__dirname + '/app/main.js',
    output:{
        path:__dirname + '/public',
        filename:'bundle-[hash].js'
    },
    devServer:{
        contentBase:'./public',     //本地服务器需要加载的页面
        historyApiFallback:true,    //不跳转
        inline:true, //实时刷新
        hot:true
    },
    // optimization:{
    //     minimizer:[
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //         new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    //     ],
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.scss|css$/,
    //                 chunks: 'all',    // merge all the css chunk to one file
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    module:{
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }],
                })
                //  use:[
                //     MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                //         "css-loader"
                //     ]
            },
            {
                test:/\.less$/,
                use:{
                    loader:"less-loader"
                }
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin(),    //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: false
        }),
        new ExtractTextPlugin("styles-[hash].css"),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: 'css/app.[name].css',
        //     chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
        // }),
        new CleanWebpackPlugin('public',{
            root: __dirname,
            verbose: true,
            dry:false
        })
    ]
}