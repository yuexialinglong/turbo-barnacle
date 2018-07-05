import { routerRedux } from 'dva/router';
import _ from 'lodash'
// import {} from '../../../services/apply/Message';

export default {
  namespace: 'infoMessage',

  state: {
    namespace: 'infoMessage', // 当前state的namespace
    attendDevice: '',
    applyInventorId:'',
    applyCnName:'',
    data: [
      { label: '4岁', value: '4' },
      { label: '5岁', value: '5' },
      { label: '6岁', value: '6' },
      { label: '7岁', value: '7' },
      { label: '8岁', value: '8' },
      { label: '9岁', value: '9' },
      { label: '10岁', value: '10' },
      { label: '11岁', value: '11' },
      { label: '12岁', value: '12' }
    ],
    dataTime: [
      { label: '0-1年', value: '0-1年' },
      { label: '1-2年', value: '1-2年' },
      { label: '2-3年', value: '2-3年' },
      { label: '3-4年', value: '3-4年' },
      { label: '4-5年', value: '4-5年' },
      { label: '5年以上', value: '5年以上' },
    ],
    cols: 1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname,query }) => {
        if (pathname === '/infoMessage') {
          // console.log(query,'报名query')
          if(_.size(query)>0){          
            dispatch({ type: 'updateState', payload: {applyInventorId:query.applyInventorId,applyCnName:query.applyCnName } });
            window.sessionStorage.clear();
            window.sessionStorage.setItem("applyCnName",query.applyCnName);
            window.sessionStorage.setItem("applyInventorId",query.applyInventorId);
          }
        }
      });
    }
  },

  effects: {
    * _btnClick({ payload }, { put,select }) {
    //  let inventorId  = _.size(window.localStorage)>0&&window.localStorage.inventorId;
      const state = yield select(state => state.infoMessage);
     payload.age = payload.age[0];
     payload.learnDuration = payload.learnDuration[0];
    //  console.log(payload,'基础信息跳转完善')
      yield put(routerRedux.push({
        // 路由跳转
        pathname: '/message',
        query: {payload,inventorId:state.applyInventorId}
      }));
    }
  },

  reducers: {
    updateState(state, action) {
      // debugger;
      return { ...state, ...action.payload };
    }
  }
};
