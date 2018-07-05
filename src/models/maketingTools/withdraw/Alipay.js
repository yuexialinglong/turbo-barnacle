import { Toast } from "antd-mobile";
import { routerRedux } from "dva/router";
import _ from "lodash";
import { _getVeryCode } from "../../../services/login/Login";
import {
  _bindAlipay,
  _withdrawApply
} from "../../../services/withdraw/withdraw";

export default {
  namespace: "alipay",

  state: {
    namespace: "alipay", // 当前state的namespace
    pageType2: "complete"
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === "/success") {
          if (_.size(query) > 0 && query.pageType !== "") {
            dispatch({
              type: "updateState",
              payload: { pageType: query.pageType }
            });
            window.sessionStorage.setItem("pageType1", query.pageType);
          } else
            dispatch({
              type: "updateState",
              payload: { pageType: "complete" }
            });
        }
      });
    }
  },

  effects: {
    //发送验证码
    *_getVeryCode({ payload }, { call }) {
      const res = yield call(_getVeryCode, { ...payload, type: 2 });
      // console.info('res',res);
      if (res && res.ret && res.ret.errorCode === 0) {
        Toast.success("验证码发送成功");
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("发送验证码失败");
      }
    },
    //绑定支付宝
    *_bindAlipay({ payload }, { call, put }) {
      console.log(payload);
      const res = yield call(_bindAlipay, { ...payload });
      if (res && res.ret && res.ret.errorCode === 0) {
        const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        userInfo.accountName = payload.params.accountName;
        userInfo.accountNumber = payload.params.accountNumber;
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.sessionStorage.clear();
        yield put(
          routerRedux.push({
            // 路由跳转
            pathname: "/success", // 跳转到成功页面
            query: { pageType: "complete" }
          })
        );
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("绑定失败");
      }
    },
    //申请提现
    *_withdrawApply({ payload }, { call, put }) {
      const res = yield call(_withdrawApply, { ...payload });
      // console.info('res',res);
      if (res && res.ret && res.ret.errorCode === 0) {
        yield put(
          routerRedux.push({
            // 路由跳转
            pathname: "/success", // 跳转到成功页面
            query: { pageType: "wait" }
          })
        );
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("提交失败，请重试");
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
