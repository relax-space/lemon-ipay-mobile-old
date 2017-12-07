import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import styles from './CustomKeyBoard.css';
import cs from 'classnames'//引入classnames依赖库
import { List, Toast, InputItem } from 'antd-mobile';



function CustomKeyBoard({ dispatch, amt, uaType }) {

    function keyBoardItemClickHandler(el, op) {
        var val = '';
        uaType;
        if (op == undefined) {
            val = el.target.innerHTML;
        } else {
            val = op;
        }

        if (val == 'c') {
            if (isNaN(eid)) {
                Toast.info("预支付失败，商户代码不正常！");
                return;
            }
            dispatch({
                type: 'pay/prePay',
                payload: { eid: eid, payAmt: amt, type },
            });
        }
        else {
            dispatch({
                type: 'customKeyBoard/itemClick',
                payload: { amt, val },
            });
        }
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
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;domain=.p2shop.cn;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    let eid = parseInt(GetQueryString("e_id"));
    let title = (GetQueryString("name")) || "北京衣念";
    document.title = title;
    let UA = navigator.userAgent;
    let type = '';
    if (UA.match(/Alipay/i)) {
        type = 'al'
    } else if (UA.match(/MicroMessenger\//i)) {
        let cookie = getCookie('IPAY_WECHAT_PREPAY');
        // cookie = '%7B%22appId%22%3A%22wx856df5e42a345096%22%2C%22nonceStr%22%3A%22gyD2VCDRlUIv30Jr%22%2C%22package%22%3A%22prepay_id%3Dwx20171207101857448ec5e35e0054058478%22%2C%22pay_sign%22%3A%223FB3520215D11C9AF8512EED4AD2BF08%22%2C%22signType%22%3A%22MD5%22%2C%22timeStamp%22%3A%221512613137%22%7D'
        type = 'wx';
        if (cookie) {
            fn_Pay(JSON.parse(decodeURIComponent(cookie)), 'wx');
            deleteAllCookies();
            Toast.loading('支付中...');
            return (
                <div></div>
            )
        }
    }
    else {
        type = 'al';
    }
    if (uaType != type) {
        dispatch({
            type: 'customKeyBoard/setuaType',
            payload: { uaType: type },
        });

    }
    let imgsrc = GetQueryString('logo') || 'https://tfsimg.alipay.com/images/openhome/T1GT0qXeBXXXaCwpjX.png';
    return (

        <div className={styles.normal}>
            <div className={styles.topDiv} >
                <img className={styles.logo} src={imgsrc} />
            </div>
            <div className={styles.topDiv} >
                {/* <img className={styles.logo} src={imgsrc} /> */}
                <span className={styles.shopName}>{title}</span>
            </div>
            <div className={uaType == "wx" ? styles.divInputWX : styles.divInputAL}>
                <span className={styles.spanLabel}>消费金额</span>
                <span className={uaType == "wx" ? styles.heartWX : styles.heartAL}>|</span>
                <span className={styles.spanAmt}>{amt}</span>
                <span className={styles.spanSymbel}>&yen;&nbsp;</span>
            </div>
            <div id="am-number-keyboard-container" >
                <div data-reactroot="" className={cs({ 'am-number-keyboard-wrapper': true })} style={{ "height": "240px" }} >
                    <table>
                        <tbody>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>1</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>2</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>3</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'd')} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btnD} ><img style={{"verticalAlign":"middle"}} src={require('../assets/backspace.png')} /></a></td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>4</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>5</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>6</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'c')} rowSpan="3"><a className={uaType == "wx" ? styles.btnWX : styles.btnAL}>支付</a></td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>7</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>8</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>9</a></td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'h')} className={cs({ "am-number-keyboard-item": true, "keyboard-hide": true })}></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>0</a></td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}><a className={styles.btn}>.</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { amt, uaType } = state.customKeyBoard;

    return {
        amt, uaType,
    };
}

export default connect(mapStateToProps)(CustomKeyBoard);
