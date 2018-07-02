/**
 * Created by 132 on 2018/6/27.
 */

import React, {Component} from 'react'
import config from './config.json'
import styles from './Greeter.css'

class Greeter extends Component{
    render(){
        return(
            <div className={styles.root}>
                {config.greetText}
            </div>
        )
    }
}

export default Greeter



// module.exports = function () {
//     var greet = document.createElement('div')
//     greet.textContent = app
//     return greet
// }