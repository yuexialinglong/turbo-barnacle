import { Toast } from "antd-mobile";
import _ from "lodash";
import {
  _registrationRecord,
  _invitedRecord
} from "../../../services/record/Record";

export default {
  namespace: "record",

  state: {
    namespace: "record", // 当前state的namespace
    currentPage: 1,
    invitedRecord: [],
    registrationRecord: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === "/record") {
          // 保存路由
          if (_.size(query) > 0 && query.currentPage === 1) {
            dispatch({ type: "_registrationRecord" });
          } else if (_.size(query) > 0 && query.currentPage === 2) {
            dispatch({ type: "_invitedRecord" });
          }else{
            dispatch({ type: "_registrationRecord" });
            dispatch({ type: "_invitedRecord" });
          }
        }
      });
    }
  },

  effects: {
    // 短信验证码
    *_registrationRecord({ payload }, { call, put }) {
      // const state = yield select(state => state.record);
      const userId =
        window.localStorage &&
        window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo).id;
      yield put({
        type: "updateState",
        payload: {
          currentPage: 1
        }
      });
      // alert(userId)
      const res = yield call(_registrationRecord, { id: userId });
      if (res && res.ret && res.ret.errorCode === 0) {
        // alert('1111---11111')
        yield put({
          type: "updateState",
          payload: {
            registrationRecord: res.ret.data,
            currentPage: 1
          }
        });
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("暂无数据");
      }
    },
    *_invitedRecord({ payload }, { call, put }) {
      const userId =
        window.localStorage &&
        window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo).id;
      yield put({
        type: "updateState",
        payload: {
          currentPage: 2
        }
      });
      // alert(userId)
      const res = yield call(_invitedRecord, { id: userId });
      if (res && res.ret && res.ret.errorCode === 0) {
        // alert('2222-22222')
        yield put({
          type: "updateState",
          payload: {
            invitedRecord: res.ret.data
          }
        });
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("暂无数据");
      }
    }
  },

  reducers: {
    updateState(state, action) {
      // debugger
      return { ...state, ...action.payload };
    }
  }
};
