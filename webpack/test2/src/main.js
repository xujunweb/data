/**
 * Created by 132 on 2018/7/3.
 */
import css from './css/index.css'
import less from './css/indexless.less'
import Vue from 'vue'
import index from './app/index.vue'



document.getElementById("study").innerHTML="hello webpack"

window.app = new Vue({
    el:'#app',
    render:h=>h(index)
})


