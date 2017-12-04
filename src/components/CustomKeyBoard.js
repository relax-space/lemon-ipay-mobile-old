import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import styles from './CustomKeyBoard.css';
import cs from 'classnames'//引入classnames依赖库

function CustomKeyBoard({dispatch, amt }) {
    function keyBoardItemClickHandler(el, op) {
        var val = '';
        if (op == undefined) {
            val = el.target.innerHTML;
        } else {
            val = op;
        }
        if (val == 'c') {
            dispatch({
                type: 'pay/prePay',
                payload: { eid: eid, payAmt:amt, type },
            });
        } else {
            dispatch({
                type: 'customKeyBoard/itemClick',
                payload: { amt, val },
            });
        }
    }
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    let eid = 10001;
    let url = location.href;
    let UrlArr = url.split('?');
    if (UrlArr.length > 1) {
        let paramArr = UrlArr[1].split('&');
        if (paramArr.length > 0 && paramArr[0].toLowerCase().indexOf('eid') > -1) {
            let payParamArr = paramArr[0].split('=');
            eid = ((payParamArr[1]));
        }
    }
    let UA = navigator.userAgent;
    let type = '';
    if (UA.match(/Alipay/i)) {
        type = 'al'
    } else if (UA.match(/MicroMessenger\//i)) {
        let cookie = getCookie('IPAY_WECHAT_PREPAY');
        //cookie='%7B%22appId%22%3A%22wx856df5e42a345096%22%2C%22nonceStr%22%3A%22XXUfypDLZrZELzI4%22%2C%22package%22%3A%22prepay_id%3Dwx20171130144118c840f467f60672200485%22%2C%22pay_sign%22%3A%228B7F646341AF4A7B8F206569ECA66D7A%22%2C%22signType%22%3A%22MD5%22%2C%22timeStamp%22%3A%221512024078%22%7'
        if (cookie) {
            return (
                <div></div>
            )
        }
        type = 'wx';
    }
    else {
        type = 'al';
    }
    return (
        <div className={styles.normal}>
            <div className={styles.divInput}>
                <span className={styles.spanLabel}>支付金额</span>
                <span className={styles.spanAmt}>{amt}</span>
                <span className={styles.spanSymbel}>￥</span>
            </div>
            <div id="am-number-keyboard-container">
                <div data-reactroot="" className={cs({ 'am-number-keyboard-wrapper': true })}>
                    <table>
                        <tbody>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>1</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>2</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>3</td>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'd')} className={cs({ "am-number-keyboard-item": true, "keyboard-delete": true })} rowSpan="2"></td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>4</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>5</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>6</td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>7</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>8</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>9</td>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'c')} className={cs({ "am-number-keyboard-item": true, "keyboard-confirm": true })} rowSpan="2">支付</td>
                            </tr>
                            <tr>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>.</td>
                                <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({ 'am-number-keyboard-item': true })}>0</td>
                                <td onClick={keyBoardItemClickHandler.bind(this, null, 'h')} className={cs({ "am-number-keyboard-item": true, "keyboard-hide": true })}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { amt } = state.customKeyBoard;
    const { type } = state.pay;

    return {
        amt,
    };
}

export default connect(mapStateToProps)(CustomKeyBoard);
