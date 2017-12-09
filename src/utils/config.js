export default {
  name: 'dva-admin',
  prefix: '',
  footerText: 'dva-admin 版权所有 © 2016 由 pmg1989 提供支持',
  logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
  logoText: 'DVA Admin',
  needLogin: true,
};

export const backendAddr = (() => {
  const env = process.env.API_ENV
  switch (env) {
    case 'staging': return {
      wxPrepay: 'https://staging.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://staging.p2shop.cn/ipay/v3/al/prepay',
      alNotifyUrl: 'https://staging.p2shop.cn/ipay/v3/al/notify',
      myUrl: 'https://ipay-staging.p2shop.cn/#/pay',
      notifyUrl: 'https://staging.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1',
    };
    case 'production': return {
      wxPrepay: 'https://staging.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://staging.p2shop.cn/ipay/v3/al/prepay',
      alNotifyUrl: 'https://staging.p2shop.cn/ipay/v3/al/notify',
      myUrl: 'https://ipay-staging.p2shop.cn/#/pay',
      notifyUrl: 'https://staging.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1',
    };
    default: return {
      wxPrepay: 'https://staging.p2shop.cn/ipay/v3/wx/prepayeasy',
      alPrepay: 'https://staging.p2shop.cn/ipay/v3/al/prepay',
      alNotifyUrl: 'https://staging.p2shop.cn/ipay/v3/al/notify',
      myUrl: 'https://ipay-staging.p2shop.cn/#/pay',//'http://www.baidu.com',//
      notifyUrl: 'https://staging.p2shop.cn/ipay/v3/wx/notify',
      tokenUrl:'https://gateway.p2shop.cn/wx-access-token-api/api/v1/accessToken_Public/1',
    };
  }
})();
