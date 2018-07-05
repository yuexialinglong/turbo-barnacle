import { Toast } from "antd-mobile";
import _ from "lodash";
import { routerRedux } from "dva/router";
import { _getVeryCode, _loginBtn } from "../../../services/login/Login";

export default {
  namespace: "login",

  state: {
    namespace: "login", // 当前state的namespace
    btnText: "登录",
    stateinventorId: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        // console.log(query,'88888888')
        if (pathname === "/login") {
          window.localStorage.removeItem("userInfo");
        }
        if (
          // pathname === "/login" ||
          pathname === "/" &&
          window.localStorage.userInfo &&
          JSON.parse(window.localStorage.userInfo).accessToken
        ) {
          dispatch(
            routerRedux.push({
              // 路由跳转
              pathname: "/mine", // 保存成功后跳转到我的招生
              query: { pageType: 1 }
            })
          );
        } else if (
          (_.size(query) > 0 &&
            query.stateinventorId &&
            query.stateinventorCnName) ||
          window.sessionStorage.getItem("inventorId")
        ) {
          if (
            _.size(query) > 0 &&
            query.stateinventorId &&
            query.stateinventorCnName
          ) {
            window.sessionStorage.clear();
            window.sessionStorage.setItem("inventorId", query.stateinventorId);
            window.sessionStorage.setItem(
              "inventorCnName",
              query.stateinventorCnName
            );
            // console.log(window.sessionStorage,'&&&&&&&&&&&')
          }
          dispatch({
            type: "updateState",
            payload: { btnText: "确认注册" }
          });
        } else {
          dispatch({
            type: "updateState",
            payload: { btnText: "登录" }
          });
        }
        // if (inventorId && inventorCnName && accessToken) {
        //   dispatch({
        //     type: "updateState",
        //     payload: { btnText: "登录", inventorId:inventorId }
        //   });
        // }else if(query.){
        //   dispatch({
        //     type: "updateState",
        //     payload: { btnText: "确认注册", inventorId:inventorId }
        //   });
        // }
      });
    }
  },

  effects: {
    // 短信验证码
    *_getVeryCode({ payload }, { call }) {
      payload.phone = window.specialTrim(payload.phone, 1);
      const res = yield call(_getVeryCode, { ...payload, type: 1 });
      if (res && res.ret && res.ret.errorCode === 0) {
        Toast.success("验证码发送成功");
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("发送验证码失败");
      }
    },
    *_loginBtn({ payload }, { call, put, select }) {
      let inventorId = window.sessionStorage.getItem("inventorId");
      inventorId = !isNaN(inventorId + "") ? inventorId : 0;
      // console.log(inventorId,'=====9090999')
      payload.phone = window.specialTrim(payload.phone, 1);
      // console.log(payload,'登录入参')
      // const state = yield select(state => state.login);
      const res = yield call(_loginBtn, {
        ...payload,
        sourceId: inventorId,
        channel: "SYB"
      });
      if (res && res.ret && res.ret.errorCode === 0) {
        window.localStorage.clear();
        window.localStorage.setItem("userInfo", JSON.stringify(res.ret.data));
        if (res.ret.data.operate === 1) {
          yield put(
            routerRedux.push({
              // 路由跳转
              pathname: "/setUserName",
              query: { inventorId: inventorId }
            })
          );
        } else if (res.ret.data.operate === 2) {
          // yield put(
          //   routerRedux.push({
          //     // 路由跳转
          //     pathname: "/mine", // 跳转到我的招生
          //     query: { pageType: 1 }
          //   })
          // );
          if (window.sessionStorage.inventorId) {
            Toast.info("该账号已注册,正在登陆", 2, function() {
              window.location.href = "https://syb.pdabc.com/mine";
            });
          } else {
            window.location.href = "https://syb.pdabc.com/mine";
          }
        }
      } else {
        res && res.ret && res.ret.errorMessage
          ? Toast.fail(res.ret.errorMessage)
          : Toast.fail("登录失败");
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
