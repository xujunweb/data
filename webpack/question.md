### webpack项目优化方案
1、include 或 exclude 限制 loader 范围
2、happypack多进程编译
3、缓存babel编译过的文件
4、tree Shaking 删除冗余代码
5、按需加载，按需引入
6、vue使用babel里设置plugin-syntax-dynamic-import就可以按需引入路由
7、SplitChunksPlugin给第三方库拆包，便于不变的项目有浏览器缓存
8、productionSourceMap生成环境关闭
9、通过<script type='module'/>标签检查是否兼容es6
10、使用imagemin-webpack-plugin插件将图片转换成webp格式，通过<picture>、<source>标签来使用
11、骨架图
12、数据预取，包括接口数据，和加载详情页图片
13、webpack本身提供的优化，Base64，资源压缩，Tree shaking，拆包thunk
14、减少重定向

### 工程化优化方向

客户端Gzip离线包，服务器资源Gzip压缩
JS瘦身，Tree shaking，ES Module，动态Import，动态Polyfill
图片加载优化，Webp，考虑兼容性，可以提前加载一张图片，嗅探是否支持Webp
延迟加载不常用内容。通过打点，看某些弹窗内或者子内容是否要初始化加载
服务端渲染，客户端预渲染
CDN静态资源
Webpack Dll，通用包优先打包抽离，后续打包的时候直接使用缓存

### 首屏加载优化

资源CDN加速
使用http2（优势，二进制数据传输，多路复用仅需要一个 TCP 建立请求通道）
图片懒加载，图片转webp格式
组件按需引入，路由按需引入
Tree Shaking删除冗余代码
动态Polyfill，动态检测加载es6代码

