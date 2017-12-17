import request from '../utils/request';
import { backendAddr } from '../utils/config';


export function queryProduct({ product_id }) {
    return request(backendAddr.productUrl+`/greenBiz/${product_id}`,
    {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        },
    }
);
}


export function prepayAl({ product,payAmt }) {
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
                "total_amount":parseFloat(payAmt),
                "notify_url":backendAddr.alNotifyUrl,
                "body":"e_id||||"+encodeURIComponent(product.e_id.toString())
            })
        }
    );
}