/**
 * Created by 132 on 2018/4/25.
 */
(function () {
/**
 * -----------------------------多态-------------------------
 * 多态：调用不同对象的相同方法时输出不同的结果，将'做什么'和'谁去做分离开'
 * 多态的好处：在访问对象时不用检查对象的类型，直接调用对象的方法
 * 所以javascritpt天生带有多态性(动态类型语言，不用检查类型)
 * */
    //例
    var presonA = {
        action:function () {
            console.log('吃饭')
        }
    }
    var presonB = {
        action:function () {
            console.log('睡觉')
        }
    }

    var startPlayA = function (type) {
        if(type === 'A'){
            presonA.action()
        }
        if(type === 'B'){
            presonB.action()
        }
    }
    startPlayA(presonA)      //吃饭
    startPlayA(presonB)      //睡觉

    var startPlayB = function (map) {
        //检测map.action是否是Function的实例
        if(map.action instanceof Function){
            map.action()
        }
    }
    startPlayB(presonA)      //'吃饭'
    startPlayB(presonB)      //'睡觉'

/**
 * 上面的例子中将startPlayB(做什么)和presonA,presonB(谁来做)完全分开(解耦合)了
 * */


/**
 * --------------------------------封装-----------------------------------
 * 封装的目的是将信息隐藏，封装应该被视为“任何形式的封装”，也就是说，封装不仅仅是
 * 隐藏数据，还包括隐藏实现细节、设计细节以及隐藏对象的类型等
 * */
    //封装数据
    var myObject = (function () {
        var _name = 'sven'  //私有(private)变量
        return {
            getName:function () {   //公开(public)方法
                return _name
            }
        }
    })()
    console.log( myObject.getName() )   //'sven'
    console.log( myObject._name )       //undefined



})