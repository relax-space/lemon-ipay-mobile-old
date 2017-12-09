import request from '../utils/request';
import { backendAddr } from '../utils/config';


export function prepay({ eid = 1, payAmt, type}) {
    if (type == 'wx') {
        let myUrl = encodeURIComponent(backendAddr.myUrl)
        let prepayParam = { "e_id": eid, "body": "xiaomiao test", "total_fee": payAmt, "trade_type": "JSAPI", "notify_url": backendAddr.notifyUrl };
        return request(backendAddr.wxPrepay + '?app_id=wx856df5e42a345096&page_url="' + myUrl + '"&prepay_param=' + JSON.stringify(prepayParam),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
            }
        );
    }
    else if (type == 'al') {
        return request(backendAddr.alPrepay,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "e_id": eid,
                    "subject": "xiaomiao test ali",
                    "total_amount": payAmt,
                    "notify_url":backendAddr.alNotifyUrl,
                    "body":"e_id||||"+encodeURIComponent(eid.toString())
                })
            }
        );

    }
}

export function getToken() {
    return request(backendAddr.tokenUrl
        ,
        {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    );
}
