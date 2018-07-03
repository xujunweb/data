/**
 * Created by 132 on 2018/7/3.
 */
const path = require('path')
module.exports = {
    mode:'development',
    entry:{
      main:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js'
    },
    //模块：例如解读css,图片如何转换,压缩
    module:{},
    //插件,用于生产模板和各项功能
    plugins:[

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