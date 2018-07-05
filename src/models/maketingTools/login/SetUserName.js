import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { routerRedux } from 'dva/router';
import { _saveClick } from '../../../services/login/SetUserName';

export default {
  namespace: 'setUserName',

  state: {
    namespace: 'setUserName', // 当前state的namespace
    btnsaveText: '保存',
    cnName: '',
    bottomText:false,
    // userId:window.localStorage && window.localStorage.userInfo && JSON.parse(window.localStorage.userInfo).id,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/setUserName') {
          if (_.size(query) > 0 && query.inventorId) {
            dispatch({
              type: 'updateState',
              payload: { btnsaveText: '保存并注册',bottomText:true }
            });
          }
        }
      });
    }
  },

  effects: {
    * _saveClick({ payload }, { call, put, select }) {
      if(!payload.cnName){
        payload.cnName = (window.localStorage &&
        window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo).cnName) ||''
      }
      const state = yield select(state => state.setUserName);
      const userId =
        window.localStorage &&
        window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo).id;
      let res;
      if(!payload.cnName){
          Toast.fail('请填写用户名！')
      }else{
         res = yield call(_saveClick, { ...payload, id: userId });
        if (res && res.ret && res.ret.errorCode === 0) {
          let userInfo  = JSON.parse(window.localStorage.getItem('userInfo'));
          userInfo.cnName = payload.cnName;
          window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
          if (state.btnsaveText === '保存') {
            yield put(routerRedux.push({
              // 路由跳转
              pathname: '/mine', // 保存成功后跳转到我的招生
              query: { pageType: 1 }
            }));
          } else {
            
            yield put(routerRedux.push({
              // 路由跳转
              pathname: '/focusCode', // 保存成功后跳转关注公众号
              // query: { pageType: 1 }
            }));
            // window.location.href =
            // 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0OTg0OTY5Mw==&scene=110#wechat_redirect'
              // 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0OTg0OTY5Mw==#wechat_redirect';
          }
        } else {
          res && res.ret && res.ret.errorMessage
            ? Toast.fail(res.ret.errorMessage)
            : Toast.fail('登录失败');
        }
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
