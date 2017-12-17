import React from 'react'
import { connect } from 'dva'
import styles from './Prepay.less'
import KeyboardComponent from '../Keyboard/Keyboard'

function Prepay({ dispatch, number,first,product }) {
     function getQueryString(name) {
        let index = window.location.href.indexOf('?');
        let search = window.location.href.substr(index + 1)
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = search.match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            }
            catch (e) {
                return null;
            }
        }
        return null;
    }
    function changeNumber(numb) {
        dispatch({
            type: "prepay/addAmt",
            payload: { val: numb }
        })
    }

    function showTotalAmt() {
        console.log(number)
        dispatch({
            type:"prepay/prepayAl",
            payload:{product,number}
        })
    }

    let options = {
        number: number,
        btnName: "支付",
        max: 10000
    }
    let uaType ='wx'
    let UA = navigator.userAgent;
    if  (UA.match(/MicroMessenger\//i)){
        options.uaType='wx'

    }else if (UA.match(/Alipay/i)){
        options.uaType='al'
    }else{
        options.uaType='al'
    }

    if (!product.e_id){
        let product_id = getQueryString("product_id") 
        dispatch({
            type: "prepay/queryProduct",
            payload: { product_id:product_id}
        })
    }
    return (
        <div className={styles.normal}>
            <div className={styles.topDiv}>
                <img className={styles.logo} src={product.logo_url} />
            </div>
            <div>
                <span className={styles.shopName}></span>
            </div>
            <div className={options.uaType=="wx"?styles.divInputWX:styles.divInputAL}>
                <span className={styles.spanLabel}>消费金额</span>
                <span className={options.uaType=="wx"?styles.heartWX:styles.heartAL}>|</span>
                <span className={styles.spanAmt}>{number}</span>
                <span className={styles.spanSymbel}>&yen;&nbsp;</span>
            </div>

            <KeyboardComponent options={options} changeNumber={changeNumber.bind(this)} onClick={showTotalAmt.bind(this)} />
        </div>
    );
}
function mapStateToProps(state) {
    const { number,first ,product} = state.prepay
    return { number,first,product }
}
export default connect(mapStateToProps)(Prepay)