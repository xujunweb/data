/**
 * Created by 132 on 2018/4/28.
 */
(function () {

    /**
     * -------------------单例模式-----------------------
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


})