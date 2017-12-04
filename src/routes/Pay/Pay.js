import React from 'react';
import { connect } from 'dva';
import styles from './Pay.css';
import CustomKeyBoardComponent from '../../components/CustomKeyBoard';
import { List, Toast, InputItem } from 'antd-mobile';

function Pay({ pay, amt, dispatch }) {
    function fn_a(v) {
        // //验证金额输入规则
        // if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
        //     if (v === '.') {
        //         v = '0.';
        //     }
        //     else {
        //         return;
        //     }
        // }
        // if (parseFloat(v) > 2000) {
        //     Toast.info('金额过大！');
        //     return;
        // }
        dispatch({
            type: 'pay/changeAmt',
            payload: { payAmt: v },
        });
    }
    function fn_Prepay(eid, payAmt, type) {
        // if (!payAmt || !/(^[1-9]\d*(\.\d{0,2})?$)|(^\d(\.\d{0,2})?$)/.test(payAmt)) {
        //     Toast.info("请输入正确的金额");
        //     return;
        // }
        dispatch({
            type: 'pay/prePay',
            payload: { eid: eid, payAmt, type },
        });
    }
    function fn_Pay(param, type) {
        dispatch({
            type: 'pay/pay',
            payload: { param, type },
        });
    }
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    let UA = navigator.userAgent;
    let url = location.href;
    let UrlArr = url.split('?');
    let eid = 10001;
    if (UrlArr.length > 1) {
        let paramArr = UrlArr[1].split('&');
        if (paramArr.length > 0 && paramArr[0].toLowerCase().indexOf('eid') > -1) {
            let payParamArr = paramArr[0].split('=');
            eid = ((payParamArr[1]));
        }
    }
    if (UA.match(/Alipay/i)) {
        return (
            <div className={styles.divMain} >
                <InputItem type="number" pattern="\\d*" style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>
                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'al')} >Pay</button>
            </div>
        );
    } else if (UA.match(/MicroMessenger\//i)) {
        let cookie = getCookie('IPAY_WECHAT_PREPAY');
        //cookie='%7B%22appId%22%3A%22wx856df5e42a345096%22%2C%22nonceStr%22%3A%22XXUfypDLZrZELzI4%22%2C%22package%22%3A%22prepay_id%3Dwx20171130144118c840f467f60672200485%22%2C%22pay_sign%22%3A%228B7F646341AF4A7B8F206569ECA66D7A%22%2C%22signType%22%3A%22MD5%22%2C%22timeStamp%22%3A%221512024078%22%7'
        if (cookie) {
            fn_Pay(JSON.parse(decodeURIComponent(cookie)), 'wx');
            return (
                <div></div>
            )
        }
        return (
            <div className={styles.divMain} >
                <InputItem type="number" pattern="\\d*" style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>

                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'wx')} >Pay</button>
            </div>
        );

        // return (
        //     <div className={styles.divMain} >
        //         <div ><input className={styles.payInput} value={amt} onChange={e => fn_a(e.target.value)} placeholder='支付金额' /></div>
        //         <button className={styles.paybtn} onClick={() => fn_Prepay(pay.payAmt, 'wx')} >支付</button>
        //         <CustomKeyBoardComponent />
        //     </div>
        // );
    } else {
        return (
            <div className={styles.divMain} >
                <InputItem type="number" pattern="\\d*" style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>

                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'al')} >Pay</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { amt } = state.customKeyBoard;
    return { pay: state.pay, amt };
}

export default connect(mapStateToProps)(Pay);
