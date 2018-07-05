import _ from 'lodash';
// import {
//     _saveClick
// } from '../../../services/login/SetUserName';

export default {
  namespace: 'preview',

  state: {
    namespace: 'preview', // 当前state的namespace
    cnName: '',
    userId:
      window.localStorage &&
      window.localStorage.userInfo &&
      JSON.parse(window.localStorage.userInfo).id
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/preview') {
          if (_.size(query) > 0 && query.previewName !== '') {
            dispatch({ type: 'updateState', payload: { cnName: query.previewName } });
          }
        }
      });
    }
  },

  effects: {
    // *_saveClick({ payload },{ call , put , take , select }){
    //     let state = yield select( state => state.setUserName );
    //     let res = yield call(_saveClick, { ...payload,id:state.userId});
    //     if(res && res.ret && res.ret.errorCode === 0){
    //         if(state.btnsaveText ==='保存'){
    //             yield put(routerRedux.push({  //路由跳转
    //                 pathname : '/mine',      //保存成功后跳转到我的招生
    //                 query:{pageType:1}
    //             }));
    //         }else{
    //             window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0OTg0OTY5Mw==&scene=124#wechat_redirect'
    //         }
    //     }else{
    //         res && res.ret && res.ret.errorMessage ? Toast.fail(res.ret.errorMessage) : Toast.fail('登录失败');
    //     }
    // },
  },

  reducers: {
    updateState(state, action) {
      // debugger
      return { ...state, ...action.payload };
    }
  }
};
