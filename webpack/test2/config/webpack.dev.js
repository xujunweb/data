/**
 * Created by 132 on 2018/7/3.
 */
const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')       //js压缩插件
const htmlPlugin = require('html-webpack-plugin')       //html打包插件
const extractTextPlugin = require('extract-text-webpack-plugin')    //css分离插件
const glob = require('glob')
const PurifyCSSPlugin = require("purifycss-webpack");
const website = {
    publicPath:"http://localhost:8888/"
}
module.exports = {
    mode:'development',
    entry:{
      main:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js',
        publicPath:website.publicPath  //publicPath：主要作用就是处理静态文件路径的。
    },
    //模块：例如解读css,图片如何转换,压缩
    module:{
        rules:[
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{loader:"css-loader"},{
                        loader:'postcss-loader'
                    }]
                })
                // use:[
                //     {loader:'style-loader'},
                //     {loader:'css-loader'}
                // ]
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:1000, //是把小于1000B的文件打成Base64的格式，写入JS
                            outputPath:'images/'  //打包后的图片放到images文件夹下
                        }
                    }
                ]
            },
            {
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
            {
                test:/\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{loader:"css-loader"},{loader:"less-loader"}]
                })
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                },
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    //插件,用于生产模板和各项功能
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{    //是对html文件进行压缩
                removeAttributeQuotes:true    //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true,
            template:'./src/index.html'
        }),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new extractTextPlugin('css/index.css')  //这里的/css/index.css 是分离后的路径
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,"../dist"),
        //服务器的IP地址
        host:'localhost',
        compress:true,
        port:8888
    }
}