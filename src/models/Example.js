/* eslint-disable */
// import {
//    fetch
// } from '../../services/mainLayout/mainLayoutService';

export default {
  namespace: 'example',

  state: {
    id: '1',
    searchContent: {},
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {});
    }
  },

  effects: {
    *test({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          id: '2'
        }
      });
    },

    *haha({ payload }, { call, put, select, take }) {
      const aaa = { ...payload, hahaha: '123' };
      yield put({
        type: 'updateState',
        payload: {
          searchContent: aaa
        }
      });
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
