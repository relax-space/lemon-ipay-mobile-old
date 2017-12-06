export default {
    namespace: 'customKeyBoard',
    state: {
        amt: '',
        uaType: 'wx'
    },
    reducers: {
        saveUAType(state, { payload: { uaType} }) {
            return { ...state, uaType };
        },
        saveAmt(state, { payload: { amt} }) {
            return { ...state, amt };
        },
    },
    effects: {
        *setuaType({ payload: {uaType} }, { put }) {
            var type = uaType;

            yield put({
                type: 'saveUAType',
                payload: {
                    amt: '',
                    uaType: type,
                },
            });
        },
        *itemClick({ payload: {amt, val, type} }, { call, put }) {
            var newAmt = amt;

            switch (val) {
                case 'd':
                    newAmt = amt.substring(0, amt.length - 1);
                    break;
                case 'c':
                case 'h':
                
                    break;
                case '.':
                    var indexDot = amt.indexOf('.');
                    if (indexDot < 0) {
                        if (amt == '') {
                            newAmt = amt + '0' + val;
                        } else {
                            newAmt = amt + val;
                        }
                    }
                    break;
                default:
                    var indexDot = amt.indexOf('.');
                    if (indexDot >= 0) {
                        if (amt.length - indexDot > 2) {
                            break;
                        } else {
                            newAmt = amt + val;
                            break;
                        }
                    }
                    newAmt = parseFloat(amt + val) + '';
                    break;
            }

            if (newAmt > 10000000) {
                newAmt = amt;
            }

            // console.log(newAmt)
            yield put({
                type: 'saveAmt',
                payload: {
                    amt: newAmt,
                },
            });
        },
    },
    subscriptions: {
    },
};
