/**
 * Created by 132 on 2018/4/25.
 */
(function () {
    /**
     * --------------------------this-----------------------------
     * this一般指向调用这个函数的对象
     * */




    /**
     * call()和apply()都是改变调用他们的方法的作用域，也就是改变this的指向
     * 区别在于他们的传参不一样
     * 他们两也可以用于实现构造函数的继承
     * */
    window.testnumber = 1
    document.testnumber = 2
    var tests1 = {
        testnumber:3
    }
    function changNumber(say) {
        console.log(say+this.testnumber)
    }
    changNumber.call(window,1)    //2
    changNumber.call(document,1)  //3
    changNumber.call(tests1,1)    //4
    changNumber.apply(window,[1])    //2
    changNumber.apply(document,[1])  //3
    changNumber.apply(tests1,[1])    //4

    //构造函数继承用法
    function ObjA(a,b){
        this.name = 'name'
        this.age = 20
        this.sayName = function () {
            console.log(this.name+a+b)
        }
    }

    function ObjB() {
        ObjA.apply(this,arguments)
    }

    var obj = new ObjB('is','me')
    console.log(obj.name)   //'name'
    console.log(obj.age)    //20
    console.log(obj.sayName())  //'nameisme'


    /**
     * -------------------------闭包----------------------------
     *
     *
     *
     * */
    var func = function () {
        var a = 0
        return function () {
            a++
            console.log(a)
        }
    }
    var f = funct()
    f()             //2
    f()             //3
    f()             //4

    /**
     * 当执行var f = func()时，f返回了一个匿名函数的引用，它可以访问到func()被调用时产生的环境，
     * 而局部变量a一直处于那个环境中。既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。
     * 在这里产生了一个闭包结构，局部变量的生命看起来被延续了。
     * */

    //闭包在点击事件上的运用
    var nodes = document.getElementsByTagName( 'div' )
    for ( var i = 0, len = nodes.length; i < len; i++ ){
        (function( i ){
            nodes[ i ].onclick = function(){
                console.log(i)
            }
        })( i )
    }
    /**
     * 因为点击事件的回调是异步的，所以在执行第一次事件回调的时候外层的for就循环完了(i已经变成了5)。
     * 给事件套上一层闭包就能解决这个问题，每次循环都创建一个独立的作用域，把i的值传进去。
     * */

    //----------------闭包的作用--------------
    //1.封装变量
    var mult = (function(){
        var cache = {}      //缓存对象，将cache封装成私有变量
        return function(){
            var args = Array.prototype.join.call( arguments, ',' )
            if ( args in cache ){
                return cache[ args ]
            }
            var a = 1
            for ( var i = 0, l = arguments.length; i < l; i++ ){
                a = a * arguments[i]
            }
            return cache[ args ] = a
        }
    })()

    //2.延续局部变量的寿命
    /**
     * 上面第一个例子
     * */

    //-------------闭包与面向对象的关系------------------
    /**
     * 对象以方法的形式包含了过程，而闭包则是在过程中以环境的形式包含了数据。
     * 通常用面向对象思想能实现的功能，用闭包也能实现。反之亦然。
     * */
    //闭包代码
    var extent = function() {
        var value = 0;
        return {
            call: function () {
                value++
                console.log(value)
            }
        }
    }
    var extent = extent()
    extent.call() // 输出：1
    extent.call() // 输出：2
    extent.call() // 输出：3

    //换成面向对象的写法
    var extent = {
        value: 0,
        call: function(){
            this.value++
            console.log( this.value )
        }
    }
    extent.call() // 输出：1
    extent.call() // 输出：2
    extent.call() // 输出：3

    //或者
    var Extent = function(){
        this.value = 0
    }
    Extent.prototype.call = function(){
        this.value++
        console.log( this.value )
    }
    var extent = new Extent()
    extent.call()
    extent.call()
    extent.call()

})()