//import {
//    fetch
//} from '../../services/mainLayout/mainLayoutService';

export default {

    namespace: 'sysAllManage',

    state: {
        /*base*/
        namespace : 'sysAllManage',     //当前state的namespace

        tabKey : '1',                   //tab的key值
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {

            });
        },
    },

    effects: {
//        *fetch({ payload }, { call, put, select, take }) {
//            let { ret } = yield call( fetch );
//            yield put({ type : 'test' });
//            yield take( 'test/@@end' );
//            let state = yield select( state => state.example );
//        },

        *test({ payload },{ call, put, select }){
            yield put({
                type : 'updateState',
                payload : {
                    id : '2'
                }
            })
        },

        *'haha'({ payload }, { call, put, select, take }){
            let aaa = { ...payload , hahaha : '123' }
            yield put({
                type : 'updateState',
                payload : {
                    searchContent : aaa
                }
            })
        },
    },

    reducers: {
        updateState( state, action ) {
            return { ...state, ...action.payload };
        },
    },

};
