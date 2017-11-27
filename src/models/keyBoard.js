export default {
    namespace: 'keyBoard',
    state: {
      list: [],
      total: null,
      page: null,
    },
    reducers: {
      save(state, { payload: { data: list, total, page } }) {
        return { ...state, list, total, page };
      },
    },
    effects: {
      *fetch({ payload: { page = 1 } }, { call, put }) {
        yield put({
          type: 'save',
          payload: {
            data: undefined,
            total: parseInt(10, 10),
            page: parseInt(page, 10),
          },
        });
      },
    },
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
          if (pathname === '/keyBoard') {
            dispatch({ type: 'fetch', payload: { query } });
          }
        });
      },
    },
  };
  