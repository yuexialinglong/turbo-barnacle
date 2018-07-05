import { Toast } from "antd-mobile";
import { _getWechatConfig } from "../../../services/mineIndex/mine";

export default {
  namespace: "invitationletter",

  state: {
    namespace: "invitationletter", // 当前state的namespace
    inventBtn: "立即邀请",
    showShare: false,
    stateinventorId: '',
    stateinventorCnName:'',
    wxShareData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === "/invitationletter") {
          const inventorId = getQuery("inventorId");
          const inventorCnName = getQuery("cnName")
          // console.log(inventorId,'8990787897878789')
          // console.log(inventorCnName,'8990787897878789')
          if (inventorId && inventorCnName) {
            // window.localStorage.setItem('inventorId', inventorId);
            // window.localStorage.setItem('inventorCnName', inventorCnName);
            // console.log(window.localStorage,'************')
            dispatch({
              type: "updateState",
              payload: { inventBtn: "立即注册", stateinventorId:inventorId, stateinventorCnName:inventorCnName}
            });
          }
          dispatch({ type: "_getWechatConfig" });
        }
      });
    }
  },

  effects: {
    // 获取微信分享参数
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
      // debugger;
      return { ...state, ...action.payload };
    }
  }
};
// 解析url参数
function getQuery(key) {
  const location = window.location;
  const query = {};
  const params = location.href.split('?')[location.href.split('?').length-1]|| '';
  if (params) {
    params.split("&").forEach(item => {
      const queryPair = item.split("=");
      query[queryPair[0]] = queryPair[1];
    });
  }
  const rst = query[key];
  // 解码一个编码的 URI。
  return rst ? window.decodeURIComponent(query[key]) : "";
}
