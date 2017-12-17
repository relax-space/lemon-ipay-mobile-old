import request from '../utils/request';
import { backendAddr } from '../utils/config';

export function queryProduct({ product_id }) {
    return request(backendAddr.productUrl + `/greenBiz/${product_id}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
        }
    );
}


export function prepayAl({ product, payAmt }) {
    return request(backendAddr.alPrepay,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "e_id": product.e_id,
                "subject": product.name,
                "total_amount": parseFloat(payAmt),
                "notify_url": backendAddr.alNotifyUrl,
                "body": "e_id||||" + encodeURIComponent(product.e_id.toString())
            })
        }
    );
}


// export function prepayWx({ product, payAmt }) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${params.token}`
//     };
//     let myUrl = encodeURIComponent(backendAddr.myUrl);
//     let attach = encodeURIComponent("e_id||||" + product.e_id.toString())
//     let prepayParam = { "attach": attach, "page_url": myUrl, "e_id": product.e_id, "body": product.name, "total_fee": payAmt * 100, "trade_type": "JSAPI", "notify_url": backendAddr.wxNotifyUrl }
//     window.location = backendAddr.wxPrepay + '?&prepay_param=' + JSON.stringify(prepayParam);
// }


export function getToken({param}) {
    return request(backendAddr.tokenUrl+`/tickets/${param.appId}`
        ,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+`${param.jwtToken}`
            },
        }
    );
}
