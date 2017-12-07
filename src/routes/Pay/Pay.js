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
        if (!payAmt || !/(^[1-9]\d*(\.\d{0,2})?$)|(^\d(\.\d{0,2})?$)/.test(payAmt)) {
            Toast.info("请输入正确的金额");
            return;
        }
        if (isNaN(eid)) {
            Toast.info("预支付失败，商户代码不正常！");
        }
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

    function GetQueryString(name) {
        let index = window.location.href.indexOf('?');
        let search = window.location.href.substr(index + 1)
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = search.match(reg);
        if (r != null) return unescape(r[2]); return null;
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
    let UA = navigator.userAgent;
    let url = location.href;
    let UrlArr = url.split('?');
    let eid = parseInt(GetQueryString("e_id"));
    let title = GetQueryString("name");

    if (UA.match(/Alipay/i)) {
        return (
            <div className={styles.divMain} >
                <InputItem type="money"  style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>
                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'al')} >Pay</button>
            </div>
        );
    } else if (UA.match(/MicroMessenger\//i)) {
        let cookie = getCookie('IPAY_WECHAT_PREPAY');
        //cookie='%7B%22appId%22%3A%22wx856df5e42a345096%22%2C%22nonceStr%22%3A%22XXUfypDLZrZELzI4%22%2C%22package%22%3A%22prepay_id%3Dwx20171130144118c840f467f60672200485%22%2C%22pay_sign%22%3A%228B7F646341AF4A7B8F206569ECA66D7A%22%2C%22signType%22%3A%22MD5%22%2C%22timeStamp%22%3A%221512024078%22%7'
        deleteAllCookies();
        if (cookie) {
            fn_Pay(JSON.parse(decodeURIComponent(cookie)), 'wx');
            cookie = '';
            return (
                <div></div>
            )
        }
        return (
            <div className={styles.divMain} >
                <InputItem type="money"  style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>
                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'wx')} >Pay</button>
            </div>
        );
    } else {
        return (
            <div className={styles.divMain} >
                <InputItem type="money"  style={{ "textAlign": "right" }} className={styles.payInput} placeholder="￥" clear value={pay.payAmt} onChange={(v) => fn_a(v)} ></InputItem>

                <button className={styles.paybtn} onClick={() => fn_Prepay(eid, pay.payAmt, 'al')} >Pay</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { amt } = state.customKeyBoard;
    return { pay: state.pay, amt };
}

if ('addEventListener' in document) {
    window.addEventListener('load', function () {
      var FastClick = require('fastclick');
      FastClick.attach(document.body)
    }, false)
  }

export default connect(mapStateToProps)(Pay);
