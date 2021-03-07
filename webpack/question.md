### webpack项目优化方案
1、include 或 exclude 限制 loader 范围
2、happypack多进程编译
3、缓存babel编译过的文件
4、tree Shaking 删除冗余代码
5、按需加载，按需引入
6、vue使用babel里设置plugin-syntax-dynamic-import就可以按需引入路由
7、SplitChunksPlugin给第三方库拆包，便于不变的项目有浏览器缓存
8、productionSourceMap生成环境关闭

### 工程化优化方向

客户端Gzip离线包，服务器资源Gzip压缩
JS瘦身，Tree shaking，ES Module，动态Import，动态Polyfill
图片加载优化，Webp，考虑兼容性，可以提前加载一张图片，嗅探是否支持Webp
延迟加载不常用内容。通过打点，看某些弹窗内或者子内容是否要初始化加载
服务端渲染，客户端预渲染
CDN静态资源
Webpack Dll，通用包优先打包抽离，后续打包的时候直接使用缓存
