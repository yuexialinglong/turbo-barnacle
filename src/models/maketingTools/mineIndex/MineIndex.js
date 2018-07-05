import { Toast } from "antd-mobile";
import { routerRedux } from "dva/router";
import _ from "lodash";
import {
  _getAdmissions,
  _getMine,
  _getWechatConfig
} from "../../../services/mineIndex/mine";

export default {
  namespace: "mine",

  state: {
    namespace: "mine", // 当前state的namespace
    current: 1,
    admissionsData: {},
    mineData: {},
    wxShareData: {},
    pageType1: "1"
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === "/mine") {
          // 保存路由
          if (_.size(query) > 0 && query.pageType !== "") {
            dispatch({
              type: "updateState",
              payload: { pageType: query.pageType }
            });
            window.sessionStorage.setItem("pageType1", query.pageType);
          } else
            dispatch({
              type: "updateState",
              payload: { pageType: sessionStorage.pageType1 }
            });
        }
      });
    }
  },

  effects: {
    // 获取我的招生信息
    *_getAdmissions({ payload }, { call, put }) {
      const res = yield call(_getAdmissions, { ...payload });
      if (res && res.ret && res.ret.errorCode === 0) {
        yield put({
          type: "updateState",
          payload: {
            admissionsData: res.ret.data
          }
        });
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("暂无数据");
      }
    },
    *_getMine({ payload }, { call, put }) {
      const res = yield call(_getMine, { ...payload });
      if (res && res.ret && res.ret.errorCode === 0) {
        yield put({
          type: "updateState",
          payload: {
            mineData: res.ret.data
          }
        });
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("暂无数据");
      }
    },
    *_turnAlipay({}, { put, select }) {
      const state = yield select(state => state.mine);
      const { accountName, accountNumber } = state.mineData;
      yield put(
        routerRedux.push({
          // 路由跳转
          pathname: "/alipay",
          query: { accountName, accountNumber }
        })
      );
    },
    // 获取微信分享参数
    *_getWechatConfig({ payload }, { call, put }) {
      const res = yield call(_getWechatConfig, { ...payload });
      if (res && res.ret && res.ret.errorCode === 0) {
        // alert(JSON.stringify(res.ret.data));
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
      // debugger
      return { ...state, ...action.payload };
    }
  }
};
