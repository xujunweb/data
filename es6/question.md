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








### vdom是什么？为何会存在vdom？

vdom(虚拟dom)
用JS模拟DOM结构
DOM变化的对比，放在JS层来做
DOM操作比较耗性能
提高重绘性能







### vdom如何应用，核心API是什么？

核心API：h函数，patch函数







### 介绍一下diff算法






### 什么是MVC模式，什么是MVVM

MVC(模块，视图，控制器)，MVVM(模块,数据(model)，视图(view)，视图模型(viewModel))
视图模型(viewModel): 视图和模型的一个桥梁,model可以通过数据绑定的方式影响view,view可以通过事件绑定的方式影响model



### vue三要素,响应式，模板引擎，渲染

响应式：vue如何监听到data的每个属性变化？
vue是通过Object.defineProperty方法来实现监听data的属性变化的



模板引擎：vue的模板如何被解析，指令如何处理？




渲染：vue的模板如何被渲染成html？以及渲染过程








