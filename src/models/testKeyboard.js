export default {
    namespace: 'testKeyboard',
    state: {
        number: ''
    },
    reducers: {
        save(state, { payload: { number } }) {
            return { ...state, number };
        },
    },
    effects: {
        *change({ payload: { val } }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    number: val,
                },
            });
        },
    },
    subscriptions: {

    },
};
