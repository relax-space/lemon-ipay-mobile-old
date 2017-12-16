export default {
    namespace: 'keyboard',
    state: {
        number: ''
    },
    reducers: {
        save(state, { payload: { number } }) {
            return { ...state, number };
        },
    },
    effects: {
        *itemClick({ payload: { val } }, { call, put }) {
            var rawNumber = this.state.number
            var newNumber = 0;
            switch (val) {
                case 'd':
                    newNumber = rawNumber.substring(0, rawNumber.length - 1);
                    break;
                case 'h':
                    break;
                case '.':
                    var indexDot = rawNumber.indexOf('.');
                    if (indexDot < 0) {
                        newNumber = rawNumber + '.';
                        if (rawNumber == '') {
                            newNumber = rawNumber + '0.';
                        }
                    }
                    break;
                default:
                    var indexDot = rawNumber.indexOf('.');
                    if (indexDot >= 0 && rawNumber.length - indexDot > 2) {
                        break;
                    }
                    newNumber = rawNumber + val;
                    break;
            }

            yield put({
                type: 'save',
                payload: {
                    number: newNumber,
                },
            });
        },
    },
    subscriptions: {

    },
};
