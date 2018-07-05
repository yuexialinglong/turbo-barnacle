import {
    GetTableList,               //系统设置 -> 学生来源列表查询
    AddSourseModalSubmit,       //新增保存
    ItemEditSave,               //编辑保存
    ItemOnDelete                //删除
} from '../../../services/sysManage/SystemManage';
import { message } from 'antd';

export default {

    namespace: 'sourceManage',

    state: {
        /*base*/
        namespace : 'sourceManage',             //当前state的namespace

        /*search*/
        fastSearchObj : {},                     //快捷搜索内容对象

        /*pagination*/
        num : 1,                                //当前页码
        row : 10,                               //每页条数
        total : 0,                              //总共数据条数

        /*table*/
        loading : false,                        //列表加载状态
        dataSource : [],                        //项目列表数据

        /*项目编辑*/
        editChoosedItem : {},                   //编辑下选择中项的属性

        /*项目添加modal*/
        sourceType : window.sourceType,         //用户来源渠道
        sourseAddModalVisible : false,          //modal是否显示
        sourseAddModalLoading : false,          //modal加载状态
        sourseAddModalButtonLoading : false,    //modal提交按钮加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if( pathname === '/sys_setting' ) {
                    //系统设置 -> 学生来源列表查询
                    dispatch({
                        type : 'GetTableList',
                        payload : { initEnter : true }
                    })
                }
            });
        },
    },

    effects: {
        //系统设置 -> 学生来源列表查询
        *'GetTableList'({ payload }, { call, put, select, take }) {
            let format_payload = payload || {};
            let state = yield select(state => state.sourceManage);
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
                        message.error(resAgain && resAgain.ret && resAgain.ret.errorMessage ? resAgain.ret.errorMessage : '获取学生来源列表失败');
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
                message.error(resInit && resInit.ret && resInit.ret.errorMessage ? resInit.ret.errorMessage : '获取学生来源列表失败');
                yield put({ type : 'clearTable' });
            }
            yield put({ type : 'updateState' , payload : { fastSearchObj } })
        },

        //新增提交
        *'AddSourseModalSubmit'({ payload }, { call, put, select, take }){
            yield put({ type : 'updateState' , payload : { sourseAddModalLoading : true } });
            yield put({ type : 'updateState' , payload : { sourseAddModalButtonLoading : true } });
            let res = yield call(AddSourseModalSubmit, payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('新增成功');
                yield put({ type : 'updateState', payload : { sourseAddModalVisible : false } });
                yield put({ type : 'GetTableList' })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '新增失败');
            }
            yield put({ type : 'updateState' , payload : { sourseAddModalLoading : false } });
            yield put({ type : 'updateState' , payload : { sourseAddModalButtonLoading : false } });
        },

        //编辑保存
        *'ItemEditSave'({ payload }, { call, put, select, take }){
            let res = yield call(ItemEditSave, payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('编辑成功');
                yield put({ type : 'updateState', payload : { editChoosedItem : {} } });
                yield put({ type : 'GetTableList' })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '编辑失败');
            }
        },

        //删除
        *'ItemOnDelete'({ payload }, { call, put, select, take }){
            let res = yield call(ItemOnDelete, payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('删除成功');
                yield put({ type : 'GetTableList' })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '删除失败');
            }
        },
    },

    reducers: {
        updateState( state, action ) {
            return { ...state, ...action.payload };
        },
        //列表查询条件清空
        clearTable(state, action) {
            let obj = {
                fastSearchObj : {},             //搜索条件
                loading : false,                //列表加载状态
                dataSource : [],                //列表数据
                num : 1,                        //当前页码
                row : 10,                       //每页条数
                total : 0,                      //总共数据条数
            }
            return { ...state, ...obj };
        },
        //添加来源modal清空
        resetSourceModal(state, action){
            let obj = {
                sourseAddModalVisible : false,          //modal是否显示
                sourseAddModalLoading : false,          //modal加载状态
                sourseAddModalButtonLoading : false,    //modal提交按钮加载状态
            }
            return { ...state , ...obj }
        },
    },
};
