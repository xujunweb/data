/**
 * Created by 132 on 2018/4/28.
 */
(function () {

    /**
     * -------------------高阶函数---------------------------
     * AOP技术:
     * AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
     * 这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。
     * 把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。
     * 这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，
     * 其次是可以很方便地复用日志统计等功能模块。
     * */

    //通过Function.prototype实现动态织入
    Function.prototype.before = function( beforefn ){
        var __self = this // 保存原函数的引用
        return function(){ // 返回包含了原函数和新函数的"代理"函数
            beforefn.apply( this, arguments ) // 执行新函数，修正this
            return __self.apply( this, arguments ) // 执行原函数
        }
    }
    Function.prototype.after = function( afterfn ){
        var __self = this
        return function(){
            var ret = __self.apply( this, arguments )
            afterfn.apply( this, arguments )
            return ret
        }
    }

    var func = function(){
        console.log( 2 )
    }
    func = func.before(function(){
        console.log( 1 )
    }).after(function(){
        console.log( 3 )
    })
    func()  //1,2,3

    /**
     * 函数柯里化(currying)：
     * currying 又称部分求值。一个currying 的函数首先会接受一些参数，接受了这些参数之后，
     * 该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。
     * 待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
     * */
    //假设我们要编写一个计算每月开销的函数。在每月结束之后，我们要记录每月花掉了多少钱

    var cost = (function () {
        var args = []
        return function () {
            if(arguments.length === 0){
                var money = 0
                for(var i = 0;i<args.length;i++){
                    money += args[i]
                }
                return money
            }else {
                [].push.apply(args,arguments)
            }
        }
    })()

    cost(100)   //不求值
    cost(200)   //不求值
    cost(300)   //不求值
    cost()      //600

    /**
     * 上面并不是完整的柯里化实现，业务逻辑和柯里化逻辑混合在一起了。
     * 下面试着将两个逻辑分开：
     * 编写一个通用的function currying(){}
     * */

    var currying = function (fn) {
        var args = []
        return function () {
            if(arguments.length === 0){
                return fn.apply(this,args)
            }else {
                [].push.apply(args,arguments)
                return arguments.callee
            }
        }
    }

    var cost = (function () {
        var money = 0
        return function () {
            for(var i=0;i<arguments.length;i++){
                money += arguments[i]
            }
            return money
        }
    })

    var cost = currying(cost)  //将cost柯里化

    cost(100)       //不求值
    cost(200)       //不求值
    cost(300)       //不求值
    cost()          //600


    /**
     * uncurrying:
     * 当调用Array.prototype.push.uncurrying()时的原理：
     * */
    Function.prototype.uncurrying = function () {
        var self = this // self 此时是Array.prototype.push
        return function() {
            var obj = Array.prototype.shift.call( arguments );
            // obj 是{
            // "length": 1,
            // "0": 1
            // }
            // arguments 对象的第一个元素被截去，剩下[2]
            return self.apply( obj, arguments )
            // 相当于Array.prototype.push.apply( obj, 2 )
        }
    }
    var push = Array.prototype.push.uncurrying()
    var obj = {
        "length": 1,
        "0": 1
    }
    push( obj, 2 )
    console.log( obj ) // 输出：{0: 1, 1: 2, length: 2}

    //uncurrying 的另外一种实现方式:
    Function.prototype.uncurrying = function(){
        var self = this
        return function(){
            return Function.prototype.call.apply( self, arguments )
        }
    }

    /**
     * 函数节流：
     * 将多频次执行的函数放缓
     * */
    var throttle = function (fn,interval) {
        var _self = fn,         //保存需要被延迟执行的函数引用
            timer,              //定时器
            firstTime = true    //是否是第一次被调用
        return function () {
            var args = arguments,
                _me = this
            if(firstTime){      //如果是第一次调用，不需要延迟执行
                _self.apply(_me,args)
                return firstTime = false
            }
            if(timer){
              return false
            }
            timer = setTimeout(function () {    //延迟一段时间执行
                clearTimeout(timer)
                timer = null
                _self.apply(_me,args)
            },interval||500)
        }
    }

    window.onresize = throttle(function(){
        console.log( 1 )
    }, 500 )

    /**
     * 分时函数：
     * @param {arry} ary - 需要用到的数据
     * @param {func} fn - 业务逻辑
     * @param {nubmer} count -  分批次的数量
     * */
    var timeChunk = function( ary, fn, count ){
        var obj,
            t
        var len = ary.length
        var start = function(){
            for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
                var obj = ary.shift()
                fn( obj )
            }
        }
        return function(){
            t = setInterval(function(){
                if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
                    return clearInterval( t )
                }
                start()
            }, 200 ) // 分批执行的时间间隔，也可以用参数的形式传入
        }
    }

    var ary = []
    for ( var i = 1; i <= 1000; i++ ){
        ary.push( i )
    };
    var renderFriendList = timeChunk( ary, function( n ){
        var div = document.createElement( 'div' )
        div.innerHTML = n
        document.body.appendChild( div )
    }, 8 )
    renderFriendList()

    /**
     * 惰性加载函数：
     * 已嗅探浏览器行为的方法为例：
     * 第一种：在页面加载的时候就判断好浏览器行为，然后返回对应的操作
     * */
    var addEvent = (function(){
        if ( window.addEventListener ){
            return function( elem, type, handler ){
                elem.addEventListener( type, handler, false )
            }
        }
        if ( window.attachEvent ){
            return function( elem, type, handler ){
                elem.attachEvent( 'on' + type, handler )
            }
        }
    })()
    /**
     * 第一种可以避免每次调用方法的时候都执行if语句，但是这种操作在不需要嗅探的情况下导致这部操作多余了
     * 第二种：在调用事件的时候再执行
     * */
    var addEvent = function( elem, type, handler ){
        if ( window.addEventListener ){
            addEvent = function( elem, type, handler ){
                elem.addEventListener( type, handler, false )
            }
        }else if ( window.attachEvent ){
            addEvent = function( elem, type, handler ){
                elem.attachEvent( 'on' + type, handler )
            }
        }
        addEvent( elem, type, handler )
    }




    /**
     * ---------------------------单例模式-----------------------
     * 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
     * 单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window 对象等。
     * 在JavaScript 开发中，单例模式的用途同样非常广泛。试想一下，当我们单击登录按钮的时候，
     * 页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，
     * 这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。
     * */
    //不透明的简单单例
    var Singleton = function( name ){
            this.name = name
        }
    Singleton.prototype.getName = function(){
        alert ( this.name )
    }
    Singleton.getInstance = (function(){
        var instance = null
        return function( name ){
            if ( !instance ){
                instance = new Singleton( name )
            }
            return instance
        }
    })()

    var a = Singleton.getInstance('张三')
    var b = Singleton.getInstance('李四')
    console.log(a === b)  //true

    //代理实现透明的单例模式
    var CreateDiv = function (html) {
        this.html = html
        this.init()
    }
    CreateDiv.prototype.init = function(){
        var div = document.createElement( 'div' )
        div.innerHTML = this.html
        document.body.appendChild( div )
    }
    //接下来引入代理类proxySingletonCreateDiv：
    var ProxySingletonCreateDiv = (function(){
        var instance
        return function( html ){
            if ( !instance ){
                instance = new CreateDiv( html )
            }
            return instance
        }
    })();
    var a = new ProxySingletonCreateDiv( 'sven1' )
    var b = new ProxySingletonCreateDiv( 'sven2' )
    console ( a === b )         //true

    /**
     * 代理实现的好处是将管理单例逻辑的代码分离出来，CreateDiv变成了一个普通的类，
     * 这样便于将来的迭代和修改
     * */


    /** ------------js中的单例模式-----------------
     * 全局变量不是单例模式，但在JavaScript 开发中，我们经常会把全局变量当成单例来使用。例如：
     * var a = {};
     * 当用这种方式创建对象a 时，对象a 确实是独一无二的。如果a 变量被声明在全局作用域下，
     * 则我们可以在代码中的任何位置使用这个变量，全局变量提供给全局访问是理所当然的。
     * 这样就满足了单例模式的两个条件。
     * 但是全局变量需要尽量避免命名空间污染
     */



    /**
     * ------------------------惰性单例----------------------------
     *
     * */

    var getSingle = function( fn ){
        var result
        return function(){
            return result || ( result = fn .apply(this, arguments ) )
        }
    }

    var createLoginLayer = function(){
        var div = document.createElement( 'div' )
        div.innerHTML = '我是登录浮窗'
        div.style.display = 'none'
        document.body.appendChild( div )
        return div
    }
    var createSingleLoginLayer = getSingle( createLoginLayer )
    document.getElementById( 'loginBtn' ).onclick = function(){
        var loginLayer = createSingleLoginLayer()
        loginLayer.style.display = 'block'
    }

    /**
     * 在这个例子中，我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，
     * 这两个方法可以独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一实例对象的功能
     * */



    /**
     * ------------------------策略模式----------------------------
     * 策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
     * 已计算年终奖为例：
     * 例如，绩效为S 的人年终奖有4 倍工资，绩效为A 的人年终奖有3 倍工资，而绩效为B 的人年终奖是2 倍工资。
     * */
    /**
     * 比较low的写法:
     * performanceLevel-评分
     * salary - 基本工资
     * */

    var calculateBonus = function( performanceLevel, salary ){
        if ( performanceLevel === 'S' ){
            return salary * 4
        }
        if ( performanceLevel === 'A' ){
            return salary * 3
        }
        if ( performanceLevel === 'B' ){
            return salary * 2
        }
    }
    calculateBonus( 'B', 20000 ) // 输出：40000
    calculateBonus( 'S', 6000 ) // 输出：24000

    /**
     * 使用策略模式重构代码
     * 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
     * 第二个部分是环境类Context，Context 接受客户的请求，随后把请求委托给某一个策略类。
     * 要做到这点，说明Context 中要维持对某个策略对象的引用。
     * */

    var strategies = {      //策略类
        "S": function( salary ){
            return salary * 4
        },
        "A": function( salary ){
            return salary * 3
        },
        "B": function( salary ){
            return salary * 2
        }
    }

    var calculateBonus = function( level, salary ){     //环境类
        return strategies[ level ]( salary )
    }

    console.log( calculateBonus( 'S', 20000 ) ) // 输出：80000
    console.log( calculateBonus( 'A', 10000 ) ) // 输出：30000

    /**
     * 多态在策略模式中的体现
     * 所有跟计算奖金有关的逻辑不再放在Context 中，而是分布在各个策略对象中。Context 并没有计算奖金的能力，
     * 而是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。
     * 当我们对这些策略对象发出“计算奖金”的请求时，它们会返回各自不同的计算结果，这正是对象多态性的体现，
     * 也是“它们可以相互替换”的目的。替换Context 中当前保存的策略对象，便能执行不同的算法来得到我们想要的结果。
     * 策略模式的核心思想：封装变化、委托和多态性
     * */

    //策略模式实现表单验证
        //策略对象
    var strategies = {      //封装验证规则
        isNonEmpty: function (value, errorMsg) {    //不为空
            if(value === ''){
                return errorMsg
            }
        },
        minlength: function (value, length, errorMsg) {     //最小长度限制
            if(value.length < length){
                return errorMsg
            }
        },
        isMobile: function (value, errorMsg) {      //手机号验证
            if(!/(^1[3|5|8][0-9]{9}$)/.test( value )){
                return errorMsg
            }
        }
    }

    var Validator = function(){     //验证类
        this.cache = [] // 保存校验规则
    }
    Validator.prototype.add = function( dom, rule, errorMsg ){
        var ary = rule.split( ':' ) // 把strategy 和参数分开
        this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
            var strategy = ary.shift() // 用户挑选的strategy
            ary.unshift( dom.value ) // 把input 的value 添加进参数列表
            ary.push( errorMsg ) // 把errorMsg 添加进参数列表
            return strategies[ strategy ].apply( dom, ary )
        })
    }
    Validator.prototype.start = function(){
        for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
            var msg = validatorFunc() // 开始校验，并取得校验后的返回信息
            if ( msg ){ // 如果有确切的返回值，说明校验没有通过
                return msg
            }
        }
    }

    var validataFunc = function(){
        var validator = new Validator() // 创建一个validator 对象
        /***************添加一些校验规则****************/
        validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' )
        validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6 位' )
        validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' )
        var errorMsg = validator.start() // 获得校验结果
        return errorMsg // 返回校验结果
    }
    var registerForm = document.getElementById( 'registerForm' )
    registerForm.onsubmit = function(){
        var errorMsg = validataFunc() // 如果errorMsg 有确切的返回值，说明未通过校验
        if ( errorMsg ){
            alert ( errorMsg )
            return false // 阻止表单提交
        }
    }

    /**
     * 使用策略模式重构代码之后，我们仅仅通过“配置”的方式就可以完成一个表单的校验，
     * 这些校验规则也可以复用在程序的任何地方，还能作为插件的形式，方便地被移植到其他项目中。
     * */

})