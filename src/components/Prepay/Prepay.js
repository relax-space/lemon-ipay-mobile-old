import React from 'react'
import { connect } from 'dva'
import styles from './Prepay.less'
import KeyboardComponent from '../Keyboard/Keyboard'
import { Toast } from 'antd-mobile';

function Prepay({ dispatch, number, product , payType}) {


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
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;domain=.p2shop.cn;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    function changeNumber(numb) {
        dispatch({
            type: "prepay/addAmt",
            payload: { val: numb }
        })
    }

    function showTotalAmt() {
        if (payType == "al") {
            dispatch({
                type: "prepay/prepayAl",
                payload: { product, payAmt: number }
            })
        } else if (payType == "wx"){
            dispatch({
                type: "prepay/prepayWx",
                payload: { product, payAmt: number }
            })
        }
    }

    let options = {
        number: number,
        btnName: "支付",
        max: 10000
    }
    options.uaType = 'wx'
    let UA = navigator.userAgent;
    if (UA.match(/MicroMessenger\//i)) {
        options.uaType = 'wx'
        let cookie = getCookie('IPAY_WECHAT_PREPAY');
        if (cookie) {
            let param = JSON.parse(decodeURIComponent(cookie))
            deleteAllCookies();
            dispatch({
                type: "prepay/prepayWxTwo",
                payload: { param }
            })
        }
    } else if (UA.match(/Alipay/i)) {
        options.uaType = 'al'
    }
    else {
        return (
            <div></div>
        )
    }

    let product_id = getQueryString("product_id")
    if (product_id != null && !product.e_id) {
        dispatch({
            type: "prepay/queryProduct",
            payload: { product_id: product_id, payType: options.uaType }
        })
    }
    return (
        <div className={styles.normal}>
            <div className={styles.topDiv}>
                <img className={styles.logo} src={product.logo_url} />
            </div>
            <div className={styles.topDiv}>
                <span className={styles.shopName}>{product.name}</span>
            </div>
            <div className={options.uaType == "wx" ? styles.divInputWX : styles.divInputAL}>
                <span className={styles.spanLabel}>消费金额</span>
                <span className={options.uaType == "wx" ? styles.heartWX : styles.heartAL}>|</span>
                <span className={styles.spanAmt}>{number}</span>
                <span className={styles.spanSymbel}>&yen;&nbsp;</span>
            </div>

            <KeyboardComponent options={options} changeNumber={changeNumber.bind(this)} onClick={showTotalAmt.bind(this)} />
        </div>
    );
}
function mapStateToProps(state) {
    const { number, product,payType } = state.prepay
    return { number, product,payType }
}
export default connect(mapStateToProps)(Prepay)