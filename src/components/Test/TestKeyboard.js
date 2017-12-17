import React from 'react'
import { connect } from 'dva'
import styles from './TestKeyboard.less'
import KeyboardComponent from '../Keyboard/Keyboard'
import cs from 'classnames'

function TestKeyboard({ dispatch, number }) {
    function changeNumber(numb){
        dispatch({
            type:"testKeyboard/change",
            payload:{val:numb}
        })
    }

    function showTotalAmt(){
        console.log(number)
    }
    let options ={
        number:number,
        btnName:"支付",
        max:2000,
    }
    let uaType ="WX"
    return (
        <div className={styles.normal}>
            <div className={uaType=="WX"?styles.divInputWX:styles.divInputAL}>
                <span  className={styles.spanAmt}>{number}</span>
            </div>
            <div className={styles.divInputAL}>
                <span  className={styles.spanAmt}>{number}</span>
            </div>
            <KeyboardComponent options={options} changeNumber={changeNumber.bind(this)} onClick={showTotalAmt.bind(this)}/>
        </div>
    );
}
function mapStateToProps(state) {
    const { number } = state.testKeyboard
    return { number }
}
export default connect(mapStateToProps)(TestKeyboard)