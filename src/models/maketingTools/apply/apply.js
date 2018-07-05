import {Toast} from "antd-mobile";
import { _getWechatConfig } from "../../../services/mineIndex/mine";

export default {
  namespace: 'apply',

  state: {
    namespace: 'apply',
    id: '1',
    searchContent: {},
    loading: false,
    applyInventorId: '',
    applyCnName:'',
    wxShareData: {}
    
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/apply') {
          const inventorId = getQuery('inventorId') || 1000;
          const cnName = getQuery('cnName') || 1000;
          // window.localStorage.setItem('inventorId', inventorId);
          if (inventorId) {
            dispatch({ type: 'updateState', payload: { applyInventorId:inventorId,applyCnName:cnName } });
          }
          dispatch({ type: "_getWechatConfig" });
        }
      });
    }
  },

  effects: {
    *_getWechatConfig({}, { call, put }) {
      const urlParams = window.location.href.split("#")[0];
      const res = yield call(_getWechatConfig, { url: urlParams });
      if (res && res.ret && res.ret.errorCode === 0) {
        yield put({
          type: "updateState",
          payload: {
            wxShareData: res.ret.data
          }
        });
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("获取微信数据失败");
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
function getQuery(key) {
  const location = window.location;
  const query = {};
  const params =  location.href.split('?')[location.href.split('?').length-1]|| '';
  if (params) {
    params.split('&').forEach((item) => {
      const queryPair = item.split('=');
      query[queryPair[0]] = queryPair[1];
    });
  }
  const rst = query[key];
  // 解码一个编码的 URI。
  return rst ? window.decodeURIComponent(query[key]) : '';
}
