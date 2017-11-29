
import * as payService from '../services/pay';
import { backendAddr } from '../utils/config';
export default {
    namespace: 'pay',
    state: {
        payAmt: '',
        payResult: 'fail',
        openId: "",
    },
    reducers: {
        save(state, { payload: { payAmt, payResult, openId } }) {
            return { ...state, payAmt, payResult, openId };
        },
    },
    effects: {
        *prePay({ payload: { eid = 1, payAmt, type } }, { call, put, select }) {
            payAmt = parseFloat(payAmt) * 100;
            if (type == 'wx') {
                let myUrl = encodeURIComponent(backendAddr.myUrl)
                let prepayParam = { "page_url": myUrl, "e_id": eid, "body": "xiaomiao test", "total_fee": payAmt, "trade_type": "JSAPI", "notify_url": backendAddr.notifyUrl }
                window.location = backendAddr.wxPrepay + '?&prepay_param=' + JSON.stringify(prepayParam);
            } else {
                const { data } = yield call(payService.prepay, { eid, payAmt, type });
                function jspay(result) {
                    // wx.config({
                    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    //         appId: '', // 必填，公众号的唯一标识
                    //         timestamp: , // 必填，生成签名的时间戳
                    //         nonceStr: '', // 必填，生成签名的随机串
                    //         signature: '',// 必填，签名，见附录1
                    //         jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    //     });
                    wx.chooseWXPay({
                        timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                        package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: result.pay_sign, // 支付签名
                        success: function (res) {
                            // 支付成功后的回调函数y
                        },
                        fail: function (res) {
                            console.log(res);
                        }
                    });

                }

                if (data && data.success) {
                    if (type == 'al') {
                        window.location = data.result.qr_code;
                    }
                }
            }
        },
        *changeAmt({ payload }, { call, put }) {
            // return { ...state, current: state.current - 1};   
            var payAmt = payload.payAmt;
            yield put({
                type: 'save',
                payload: {
                    payAmt: payAmt//==''?'':parseFloat(payload.payAmt)
                },
            });
        },
        *pay({  payload: {param, type} }, { call, put }) {
            // return { ...state, current: state.current - 1};   
            if (type == 'wx') {
                // jspay(data.result);
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    jsApiCall();
                }
            }
            function jsApiCall() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    {
                        timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
                        package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: param.pay_sign, // 支付签名
                    }, //josn串
                    function (res) {
                        WeixinJSBridge.log(res.err_msg);
                        if (res.errMsg == "get_brand_wcpay_request:ok") {
                            WeixinJSBridge.call('closeWindow');
                        } else if (res.errMsg == "get_brand_wcpay_request:cancel") {
                            alert("cancel");
                        } else {
                            alert(" WeixinJSBridge fail:" + res.errMsg);
                        }
                        setTimeout(function () {
                            WeixinJSBridge.call('closeWindow');
                        }, 2000);
                    }
                );
            }
        },
    },
    subscriptions: {

    },
};