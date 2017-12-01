export default {
  name: 'dva-admin',
  prefix: '',
  footerText: 'dva-admin 版权所有 © 2016 由 pmg1989 提供支持',
  logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
  logoText: 'DVA Admin',
  needLogin: true,
};

export const backendAddr = (() => {
  const env = process.env.REACT_APP_ENV
  switch (env) {
    case 'staging': return {
      wxPrepay: 'https://staging.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://staging.p2shop.cn/ipay/v3/al/prepay',
      myUrl: 'https://ipay-staging.p2shop.cn/%v?#/pay',
      notifyUrl: 'https://staging.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1'
    };
    case 'production': return {
      wxPrepay: 'https://gateway.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://gateway.p2shop.cn/ipay/v3/al/prepay',
      myUrl: 'https://ipay.p2shop.cn/%v?#/pay',
      notifyUrl: 'https://gateway.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1'
    };
    default: return {
      wxPrepay: 'https://gateway.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://gateway.p2shop.cn/ipay/v3/al/prepay',
      myUrl: 'https://ipay.p2shop.cn/%v?#/pay',//'http://www.baidu.com',//
      notifyUrl: 'https://gateway.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1'
    };
  }
})();
