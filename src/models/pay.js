
import * as payService from '../services/pay';
import { backendAddr } from '../utils/config';
import sign from '../utils/sign';
export default {
    namespace: 'pay',
    state: {
        type:'',
        payAmt: '',
        payResult: 'fail',
    },
    reducers: {
        save(state, { payload: { payAmt, payResult, openId } }) {
            return { ...state, payAmt, payResult, openId };
        },
    },
    effects: {
        *prePay({ payload: { eid = 1, payAmt, type } }, { call, put, select }) {
            payAmt = parseFloat(payAmt);
            if (type == 'wx') {
                let myUrl = encodeURIComponent(backendAddr.myUrl);
               // let attach =encodeURIComponent(JSON.stringify({"e_id": eid}));
                let prepayParam = {"attach":"1111","page_url": myUrl, "e_id": eid, "body": "xiaomiao test", "total_fee": payAmt * 100, "trade_type": "JSAPI", "notify_url": backendAddr.notifyUrl }
                window.location = backendAddr.wxPrepay + '?&prepay_param=' + JSON.stringify(prepayParam);
            } else {
                const { data } = yield call(payService.prepay, { eid, payAmt, type });

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
            let url = window.location.href;
            const { data } = yield call(payService.getToken);
            let token = data.result.api_Ticket;
            //url='https://ipay.p2shop.cn/';
            url = location.href//.split('#')[0]
            let signature = sign(token, url)
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: param.appId, // 必填，公众号的唯一标识
                timestamp: signature.timestamp, // 必填，生成签名的时间戳
                nonceStr: signature.nonceStr, // 必填，生成签名的随机串
                signature: signature.signature,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.error(function (res) {
                alert(JSON.stringify(res))
                deleteAllCookies();
            })
            wx.ready(function () {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.chooseWXPay({
                    appId: param.appId,
                    timeStamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
                    package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: param.pay_sign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数y
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function () {
                        deleteAllCookies();
                    }
                });

                // if (typeof WeixinJSBridge == "undefined") {
                //     if (document.addEventListener) {
                //         document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                //     }
                //     else if (document.attachEvent) {
                //         document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                //         document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                //     }
                // }
                // else {
                //     jsApiCall();
                // }

            });

            // function jsApiCall() {
            //     WeixinJSBridge.invoke(
            //         'getBrandWCPayRequest',
            //         {
            //             appId: param.appId,
            //             timeStamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //             nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
            //             package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            //             signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //             paySign: param.pay_sign,
            //         }, //josn串
            //         function (res) {
            //             WeixinJSBridge.log(res.err_msg);
            //             if (res.errMsg == "get_brand_wcpay_request:ok") {
            //                 WeixinJSBridge.call('closeWindow');
            //             } else if (res.errMsg == "get_brand_wcpay_request:cancel") {
            //                 alert("支付取消");
            //             } else {
            //                 alert("支付失败:" +JSON.stringify(res));
            //             }
            //             //alert(res.err_code + "||" + res.err_desc + "||" + res.err_msg);
            //         }
            //     );
            // }
            function deleteAllCookies() {
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
        },
        subscriptions: {

        },
    },
};