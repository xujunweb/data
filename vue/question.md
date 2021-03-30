
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





### 计算属性（computed）是什么，和在methods中定义方法处理数据有什么区别？

var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
计算属性的底层实现是改变了数据的getter方法，在数据获取的时候改变了返回值

计算属性可以和data中的某些数据建立依赖关系，data中的数据改变的时候也会跟着改变。
和方法的对比：计算数据有缓存机制，多次调用中后续的调用都是使用缓存，方法的话每次都会执行

计算属性也有监听data中的数据的功能


### 异步组件




### Vue的一些性能优化








