import { Toast } from "antd-mobile";
import _ from "lodash";
import { _btnClick } from "../../../services/apply/Message";

export default {
  namespace: "message",

  state: {
    namespace: "message", // 当前state的namespace
    attendDevice: [],
    infoMsg: {},
    iphone: false,
    ipad: false,
    pc: false,
    inventorId:'',
    submitBtn:true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === "/message") {
          if (_.size(query) > 0) {
            window.localStorage.setItem("inventorId", query.inventorId);
            dispatch({
              type: "updateState",
              payload: { infoMsg: query.payload ,inventorId:query.inventorId,attendDevice:[]}
            });
          }
        }
      });
    }
  },

  effects: {
    //
    *_btnClick({ payload }, { call, put,select }) {
      const state = yield select(state => state.message);
      
      let res = yield call(_btnClick, {
          type:11,
          // agtId: state.inventorId,
          agtId:window.sessionStorage.getItem('applyInventorId'),
          attach: JSON.stringify({
            ...payload.values,
            attendDevice: state.attendDevice,
            ...state.infoMsg
          })
        });
      if (res && res.ret && res.ret.errorCode === 0) {
        window.location.replace("/registrationSuccess");
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("报名失败");
          yield put({
            type: "updateState",
            payload: {
              submitBtn: true,
            }
          });
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
