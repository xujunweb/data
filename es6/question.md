### ES6模块化如何使用，开发环境如何打包？

export暴露模块接口，import引入模块
打包可以用webpack,rollup(专职的打包工具，打包出来的包更小)



### Class和普通构造函数有何区别？

Class更贴合面向对象的写法
Class实现继承更加易读，易理解
Class的本质是语法糖，还是用的prototype继承



### Promise的基本使用和原理





### ES6的常用功能

模块化，Promise
let(块级变量)/const(常量)
多行字符串/模板变量
解构赋值
块级作用域
函数默认参数
箭头函数



### 原型的实际应用

jq上的应用



### 原型如何体现它的扩展性

jq的插件机制(通过更改init()函数的原型(也就是$.fn))



### 什么是单线程，和异步有什么关系

单线程 - 只有一个线程，同一时间只能做一件事
避免DOM渲染的冲突
解决方案 - 异步



### 什么是event-loop(事件轮询)

异步执行的原理：按照定制的时间将回调函数丢入 异步队列 中，待同步代码执行完毕就会开始轮询执行异步队列里的函数
例：
setTimeout(function(){
    console.log('dd')
},1000)         //一秒钟之后才将这个函数丢入 异步队列



### 是否用过jQuery的Deferred

类似于ES6的Promise
很好的实现开发封闭原则
function wait(){
    var dtd = $.Deferred()
    setTimeout(function(){
        dtd.resolve()
        // dtd.reject()
    })
    return dtd.promise()
}
var w = wait()
$.when(w).then(function(){
    //成功回调
},function(){
    //失败回调
}).then(function(){
    //第一个then运行完毕后
})




### 介绍下async/await(和Promise的区别、联系)








### 总结一下当前JS的解决异步的方案

















