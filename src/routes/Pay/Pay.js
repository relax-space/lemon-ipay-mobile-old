import React from 'react';
import { connect } from 'dva';
import styles from './Pay.css';

function Pay({ pay, dispatch }) {
    function fn_a(v) {
        console.log(v)
        dispatch({
            type: 'pay/changeAmt',
            payload: { payAmt: v },
        });
    }
    function fn_pay(payAmt, openId) {
        dispatch({
            type: 'pay/pay',
            payload: { eid: 10001, payAmt, openId },
        });
    }

    let UA = navigator.userAgent;
    if (UA.match(/Alipay/i)) {
        return (
            <div>
                支付宝支付功能正在开发中。。。
            </div>
        );
    } else if (UA.match(/MicroMessenger\//i)) {
        // window.location = "https://gateway.p2shop.cn/wxapi-service-api/WxCode/Index?myPageUrl=http://www.baidu.com?a=1";
        const openId = "os2u9uPKLkCKL08FwCM6hQAQ_LtI";
        return (
            <div className={styles.divMain} >
                <div ><input className={styles.payInput} value={pay.payAmt} onChange={e => fn_a(e.target.value)} placeholder='支付金额' /></div>
                <button className={styles.paybtn} onClick={() => fn_pay(pay.payAmt, openId)} >支付</button>
            </div>
        );
    } else {
        const openId = "os2u9uPKLkCKL08FwCM6hQAQ_LtI";
        return (
            <div className={styles.divMain} >
                <div ><input className={styles.payInput} value={pay.payAmt} onChange={e => fn_a(e.target.value)} placeholder='支付金额' /></div>
                <button className={styles.paybtn} onClick={() => fn_pay(pay.payAmt, openId)} >支付</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { pay: state.pay };
}

export default connect(mapStateToProps)(Pay);
