### 函数式组件和class组件的区别

函数式组件会绑定初始的prop，类似于闭包，prop传进去之后就不会改变。
class组件因为prop是绑定在this上，this有改变的可能，所以会导致prop也有改变的可能。

### HOC(高阶组件)介绍

HOC本质是接收一个组件，返回一个新组件。常用于组件的逻辑复用，类似于vue的mixins
不要在render方法里调用HOC组件，ref不会被传递下去，因为ref不属于prop，解决办法是使用React.forwardRef API

### react性能优化

setState调用注意事项，setState调用会执行render函数，导致页面上的所有子组件都重新渲染。避免setState在更新数据时渲染没必要的子组件。
setState可以尝试合并调用或者数据绑定的视图区域抽离成组件单独更新渲染。
虚拟化长列表，react-virtualized 虚拟滚动库
shouldComponentUpdate生命周期拦截渲染执行的条件，默认返回true。通过nextProps, nextState这个两个参数可以判断是否需要渲染
React.PureComponent继承自这个API的组件用当前与之前 props 和 state 的浅比较覆写了 shouldComponentUpdate() 的实现

### Portal的作用

ReactDOM.createPortal(child, container)可以将dom放入页面的任何元素里，而不是直接渲染在执行的地方。
例如弹出对话框

### react生命周期

创建期：
constructor(props,context)
static getDerivedStateFromProps(props,state) //渲染前，返回需要更新的state
render()        //开始渲染
componentDidMount()     //渲染完成之后
运行时：
static getDerivedStateFromProps(props,state)    //渲染前
shouldComponentUpdate(nextProps,nextState,nextContext)  //控制是否渲染
render()    //开始渲染
getSnapshotBeforeUpdate(prevProps,prevState)    //render输出DOM的结构渲染之前
componentDidUpdate(prevProps, prevState, snapshot)  //完成渲染之后
销毁时：
componentWillUnmount()


### render prop

使用子组件的数据动态渲染父级传入的dom。父级传入一个函数，参数是子组件的数据，返回一个dom

### react自带的HOOK介绍

useState:可以给函数组件添加state，setXXX可以响应式的改变数据；
useEffect:类似class组件的生命周期，第二个参数为[]空数组时表示只执行一次，同样可以监控某个值改变了才触发回调，在页面渲染完毕之后会延迟一会调用；
useContext:订阅最近的Provider上的数据；
useReducer:在HOOK中使用redux里的数据的API，第一个参数是传入的reducer函数，第二个参数是初始化数据可传入state数据，第三个参数是函数，作用于惰性初始化；
useMemo:在第一次渲染的时候会执行，参数和useEffect一样，返回一个缓存的值，可以起到性能优化的作用，第二参数是监控某个数据的改变来执行相应的操作；
useCallback:和useMemo的作用几乎一样，返回的是一个函数的缓存，当监控的值改变了之后返回一个新的函数，当把函数当参数传给子组件时很有用，可以防止不必要的渲染；
useRef:主要功能和React.createRef()一样，区别在于组件重新渲染的时候useRef返回的是同一个对象引用。
useImperativeHandle:可以自定义暴露给父组件的ref，要和React.forwardRef结合使用；
useLayoutEffect:作用和useEffect一样，只是调用时机是DOM变更之后立马同步调用；
useDebugValue:在开发者工具中显示自定义HOOK的标签；

### setState是同步还是异步？

合成事件中是异步
钩子函数中的是异步
原生事件中是同步
setTimeout中是同步

### useEffect(fn, []) 和 componentDidMount 有什么差异？

useEffect 会捕获 props 和 state。所以即便在回调函数里，你拿到的还是初始的 props 和 state。如果想得到“最新”的值，可以使用 ref。

### hooks为什么不能放在判断条件里？

hooks的调用是链表式的调用，有严格的顺序关系，判断条件会打乱这个顺序，从而出现异常

### fiber 是什么？

React Fiber 是一种基于浏览器的单线程调度算法。
React Fiber 用类似 requestIdleCallback 的机制(判断浏览器每一帧之间是否还有空闲时间，来释放给浏览器做别的事情)来做异步 diff。但是之前数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了。

### 调用 setState 之后发生了什么？

1.在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2.然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3.然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
4.在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5.当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
6.当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
7.在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

### 为什么虚拟dom 会提高性能?

虚拟dom 相当于在 JS 和真实 dom 中间加了一个缓存，利用 diff 算法避免了没有必要的 dom 操作，从而提高性能。

### React 组件间有那些通信方式?

props父子通信，context跨组件通信，redux跨组件通信，发布订阅模式

### React 父组件如何调用子组件中的方法？

如果是在方法组件中调用子组件（>= react@16.8），可以使用 useRef 和 useImperativeHandle
如果是在类组件中调用子组件（>= react@16.4），可以使用 createRef

### React有哪些优化性能的手段?

类组件中的优化手段:
使用纯组件 PureComponent 作为基类
使用 React.memo 高阶函数包装组件
使用 shouldComponentUpdate 生命周期函数来自定义渲染逻辑
方法组件中的优化手段:
使用 useMemo和useCallBack

### 什么是 suspense 组件?

Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。Suspense 也可以用于懒加载。


