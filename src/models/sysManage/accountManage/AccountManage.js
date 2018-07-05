import {
    GetDepartList,              //获取部门信息
    GetTableList,               //账号管理列表查询
    AddAccountSubmit,           //新增账户提交
    EditAccountGetDetail,       //获取账户详情
    EditAccountSubmit,          //编辑账户提交
    DeleteAccount               //删除账户
} from '../../../services/sysManage/AccountManage';
import { message } from 'antd';

/*系统设置 -> 账户设置*/
export default {

    namespace: 'accountManage',

    state: {
        /*base*/
        namespace : 'accountManage',            //当前state的namespace

        /*search*/
        fastSearchObj : {},                     //快捷搜索内容对象

        /*table*/
        loading : false,                        //列表加载状态
        dataSource : [],                        //列表数据

        /*pagination*/
        num : 1,                                //当前页码
        row : 10,                               //每页条数
        total : 0,                              //总共数据条数

        /*部门数据*/
        departData : [],                        //部门信息数据

        /*账户新增编辑modal*/
        accountAddOrEditModalType : undefined,          //modal类型(add/edit)
        accountAddOrEditModalVisible : false,           //modal是否显示
        accountAddOrEditModalLoading : false,           //modal加载状态
        accountAddOrEditModalButtonLoading : false,     //modal按钮加载状态
        accountAddOrEditModalData : {},                 //编辑时回填数据
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if( pathname === '/sys_setting' ) {
                    //获取部门列表数据
                    dispatch({
                        type : 'GetDepartList',
                        payload : { num : 1 , row : 50 }
                    })
                    //账号管理列表查询
                    dispatch({
                        type : 'GetTableList',
                        payload : { initEnter : true }
                    })
                }
            });
        },
    },

    effects: {
        //获取部门列表数据
        *'GetDepartList'({ payload }, { call, put, select, take }){
            let res = yield call(GetDepartList,payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                let { ret } = res;
                yield put({ type : 'updateState' , payload : { departData : ret.data || [] } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取部门信息失败');
            }
        },
        //账号管理列表查询
        *'GetTableList'({ payload }, { call, put, select, take }) {
            yield put({ type : 'updateState' , payload : { loading : true } });
            let format_payload = payload || {};
            let state = yield select(state => state.accountManage );
            let fastSearchObj = format_payload && !!format_payload.initEnter ? {} : format_payload && format_payload.fastSearchObj ? format_payload.fastSearchObj : state.fastSearchObj;
            format_payload.num = format_payload && !!format_payload.initEnter ? 1 : (format_payload.num || state.num || 1);
            format_payload.row = format_payload && !!format_payload.initEnter ? 10 : (format_payload.row || state.row || 10);
            delete format_payload.initEnter;
            delete format_payload.fastSearchObj;
            let params = { ...format_payload , ...fastSearchObj };
            let resInit = yield call(GetTableList, params);
            if(!!resInit && resInit.ret && resInit.ret.errorCode === 0){
                let { ret } = resInit;
                //因为列表有删除操作，如果当前不是第一页并且没有数据则继续请求前一页的数据
                if(ret.data && ret.data.length === 0 && params.num > 1){
                    params.num -= 1;
                    let resAgain = yield call(GetTableList, params);
                    if(!!resAgain && resAgain.ret && resAgain.ret.errorCode === 0){
                        let { ret } = resAgain;
                        yield put({
                            type : 'updateState',
                            payload : {
                                dataSource : ret.data || [],
                                num : params.num || 1,
                                row : params.row || 10,
                                total : ret.total || 0,
                            }
                        })
                    }else{
                        message.error(resAgain && resAgain.ret && resAgain.ret.errorMessage ? resAgain.ret.errorMessage : '获取账号管理列表失败');
                        yield put({ type : 'clearTable' });
                    }
                }else{
                    yield put({
                        type : 'updateState',
                        payload : {
                            dataSource : ret.data || [],
                            num : params.num || 1,
                            row : params.row || 10,
                            total : ret.total || 0,
                        }
                    })
                }
            }else{
                message.error(resInit && resInit.ret && resInit.ret.errorMessage ? resInit.ret.errorMessage : '获取账号管理列表失败');
                yield put({ type : 'clearTable' });
            }
            yield put({ type : 'updateState' , payload : { loading : false , fastSearchObj } });
        },

        //新增账户
        *'AddAccountSubmit'({ payload }, { call, put, select, take }){
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalLoading : true } });
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalButtonLoading : true } });
            let res = yield call(AddAccountSubmit,payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('新增账户成功');
                yield put({ type : 'resetAccountModal' });
                yield put({ type : 'GetTableList' });
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '新增账户失败');
            }
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalLoading : false } });
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalButtonLoading : false } });
        },

        //编辑账户获取账户详情
        *'EditAccountGetDetail'({ payload }, { call, put, select, take }){
            //获取详情同时打开modal并且开启加载状态，若接口请求完成关闭加载状态并回填，若接口请求失败则报错并关闭modal
            yield put({
                type : 'updateState' ,
                payload : {
                    accountAddOrEditModalType : 'edit',
                    accountAddOrEditModalVisible : true,
                    accountAddOrEditModalLoading : true,
                    accountAddOrEditModalButtonLoading : true
                }
            });
            let res = yield call(EditAccountGetDetail,payload);;
            if(!!res && res.ret && res.ret.errorCode === 0){
                yield put({
                    type : 'updateState',
                    payload : {
                        accountAddOrEditModalData : res.ret.data || {},
                    }
                })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取账户详情失败');
                yield put({ type : 'updateState' , payload : { accountAddOrEditModalVisible : false } })
            }
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalLoading : false , accountAddOrEditModalButtonLoading : false } })
        },

        //编辑账户
        *'EditAccountSubmit'({ payload }, { call, put, select, take }){
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalLoading : true } });
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalButtonLoading : true } });
            let res = yield call(EditAccountSubmit,payload);;
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('编辑账户成功');
                yield put({ type : 'resetAccountModal' });
                yield put({ type : 'GetTableList' });
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '编辑账户失败');
            }
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalLoading : false } });
            yield put({ type : 'updateState' , payload : { accountAddOrEditModalButtonLoading : false } });
        },

        //点击删除账户
        *'DeleteAccount'({ payload }, { call, put, select, take }){
            let res = yield call(DeleteAccount,payload);;
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('删除账户成功');
                yield put({ type : 'GetTableList' });
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '删除账户失败');
                yield put({ type : 'updateState' , payload : { accountAddOrEditModalVisible : false } })
            }
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        //新增编辑账户表单清空
        resetAccountModal(state, action){
            let obj = {
                accountAddOrEditModalVisible : false,           //modal是否显示
                accountAddOrEditModalLoading : false,           //modal加载状态
                accountAddOrEditModalButtonLoading : false,     //modal按钮加载状态
                accountAddOrEditModalData : {},                 //编辑时回填数据
            }
            return { ...state , ...obj }
        },
    },

};
