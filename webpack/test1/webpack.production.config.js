/**
 * Created by 132 on 2018/7/2.
 */
// const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglify-js-plugin')
module.exports = {
    devtool:'null',
    entry:__dirname + '/app/main.js',
    output:{
        path:__dirname + '/public',
        filename:'bundle.js'
    },
    devServer:{
        contentBase:'./public',     //本地服务器需要加载的页面
        historyApiFallback:true,    //不跳转
        inline:true, //实时刷新
        hot:true
    },
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
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin(),    //热加载插件
        new UglifyJsPlugin(),
        new ExtractTextPlugin("styles.css")
    ]
}