import * as payService from '../services/prepay';
import queryString from 'query-string';
export default {
    namespace: 'prepay',
    state: {
        number: '',
        first:true,
        product:{},
    },
    reducers: {
        save(state, { payload: { number } }) {
            return { ...state, number };
        },
        loadfirst(state, { payload: { first } }) {
            return { ...state, first };
        },
        fetchProduct(state, { payload: { product} }) {
            return { ...state, product };
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
        *load({ payload: { first } }, { call, put }) {
            yield put({
                type: 'loadfirst',
                payload: {
                    first: first,
                },
            });
        },
        *queryProduct({ payload: { product_id } }, { call, put }) {
            const { data } = yield call(payService.queryProduct, { product_id });
            console.log(data)
            if (data &&data.success){
                yield put({
                    type: 'fetchProduct',
                    payload: {
                        product: data.result,
                    },
                });
            }
        },
        *prepayAl({ payload: { product,payAmt } }, { call, put }) {
            const { data } = yield call(payService.prepayAl, { product,payAmt });
            if (data &&data.success){
                window.location = data.result.qr_code;
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, search }) => {
            const query = queryString.parse(search);
            if (pathname === '/queryProduct') {
              dispatch({ type: 'queryProduct', payload: query });
            }
          });
        },
      },
};
