/**
 * Created by 132 on 2018/4/24.
 */
(function() {
    console.log(this)
    /**
     *  --------------------------------------原型---------------------------------
     *
     *  每个函数都有个原型（prototype）属性， 原型包含由特定类型的所有实例共享的属性和方法，
     *  定义在原型上的属性和方法在所有实例上都是共享的。
     *  每个函数都有个原型属性，这个属性指向函数的原型对象，而原型对象的属性方法由所有函数的实例共享，
     *  每个对象又拥有构造（constructor）属性，这个属性指向的是prototype属性所在函数的指针，
     *  所以 function Person(){}  Person.prototype.constructor === Person。
     * */
    function Person(name) {
        this.name = name
    }
    Person.prototype = {
        //自定义 构造函数的prototype对象时 需要将原型对象的构造函数属性 指回原型对象所在的构造函数
        //否则构造函数的原型对象将指向Object
        constructor:Person,
        sayName:function () {
            console.log(this.name)
        }
    }
    /**
     *  对象都拥有__proto__属性(隐式属性)，部分浏览器(如，Chrome，Firefox)会暴露出。 此属性指向创建对象的构造器的原型对象。
     *  用对象字面量创建的对象的__proto__属性指向Object的原型，这个属性和构造函数并没有多大关系，
     *  而是指向构造函数的原型， 因为是指向关系，所以即使是先新建对象再修改原型，新建对象也会拥有原型后加的属性及方法，
     *  也正是因为这样，再创建一个对象的多个实例之后，在修改其中一个实例的原型属性将会影响到其他的实例。
     *  所以普遍使用组合模式和原型模式
     *  给对象增加原型对象中拥有的属性的同名属性，则会覆盖原型对象的属性。 要再想使用原型对象的属性
     *  需要使用 delete操作符。
     * */


    /**
     * 原型继承的基本规则：
     * 所有的数据都是对象
     * 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
     * 对象会记住它的构造器的原型
     * 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型(原型继承的核心)
     * */
    //最常见的原型继承
    var obj = {name:'xu'}
    var A = function () {

    }
    A.prototype = obj
    var a = new A()
    console.log(a.name)         //'xu'
    /**
     * 上面代码的实现原理：
     * 首先，遍历a对象中的所有属性，没找到name属性。
     * 查找name属性的这个请求被委托给对象a的构造器的原型(A.prototype)，它被a.__proto__记录着。A.prototype的值指向了obj
     * obj对象中查找到了name属性，并返回它的值。
     * */


    /**
     * --------------------------------------匿名函数---------------------------------
     *
     *
     *
     *
     * */



})()

