import * as payService from '../services/prepay';
import { backendAddr } from '../utils/config';
export default {
    namespace: 'prepay',
    state: {
        number: '',
        product: {},
        payType: "",
    },
    reducers: {
        save(state, { payload: { number } }) {
            return { ...state, number };
        },
        savePayType(state, { payload: { payType } }) {
            return { ...state, payType };
        },
        fetchProduct(state, { payload: { product, payType } }) {
            return { ...state, product, payType };
        },
    },
    effects: {
        *addAmt({ payload: { val } }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    number: val,
                },
            });
        },
        *payType({ payload: { payType } }, { call, put }) {
            yield put({
                type: 'savePayType',
                payload: {
                    payType: payType,
                },
            });
        },
        *queryProduct({ payload: { product_id, payType } }, { call, put }) {
            const { data } = yield call(payService.queryProduct, { product_id });
            console.log(data)
            if (data && data.success) {
                yield put({
                    type: 'fetchProduct',
                    payload: {
                        product: data.result,
                        payType: payType,
                    },
                });
            }
        },
        *prepayAl({ payload: { product, payAmt } }, { call, put }) {
            const { data } = yield call(payService.prepayAl, { product, payAmt });
            if (data && data.success) {
                window.location = data.result.qr_code;
            }
        },
        *prepayWx({ payload: { product, payAmt } }, { call, put }) {
            let headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            let myUrl = encodeURIComponent(backendAddr.myUrl);
            let attach = encodeURIComponent("e_id||||" + product.e_id.toString())
            let prepayParam = { "attach": attach, "page_url": myUrl, "e_id": product.e_id, "body": product.name, "total_fee": payAmt * 100, "trade_type": "JSAPI", "notify_url": backendAddr.notifyUrl }
            window.location = backendAddr.wxPrepay + '?&prepay_param=' + JSON.stringify(prepayParam);
        },
        *prepayWxTwo({ payload: { param } }, { call, put }) {
             let url = window.location.href;
             const { data } = yield call(payService.getToken,{param});
             let token = data.result.api_Ticket;
             url = location.href.split('#')[0]
             let signature = sign(token, url)
             wx.config({
                 //debug: true,
                 appId: param.appId, 
                 timestamp: signature.timestamp, 
                 nonceStr: signature.nonceStr, 
                 signature: signature.signature,
                 jsApiList: ['chooseWXPay']
             });
             wx.error(function (res) {
                 alert(JSON.stringify(res))
             })
             wx.ready(function () {
                 wx.chooseWXPay({
                     appId: param.appId,
                     timestamp: param.timeStamp, 
                     nonceStr: param.nonceStr, 
                     package: param.package, 
                     signType: param.signType, 
                     paySign: param.pay_sign, 
                     success: function (res) {
                         
                     },
                     fail: function (res) {
                         console.log(res);
                     },
                     complete: function () {
                         wx.closeWindow();
                     }
                 });
 
             });
 
        },
    },
    subscriptions: {
      
    },
};
