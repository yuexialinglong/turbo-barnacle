import {
    GetTableList,               //系统设置 -> 课程管理列表查询
    ItemOnAdd,                  //系统设置 -> 课程新增
    GetDetail,                  //系统设置 -> 获取详情
    ItemOnEdit                  //系统设置 -> 课程编辑
} from '../../../services/sysManage/CourseManage';
import { message } from 'antd';

/*系统设置 -> 课程设置*/
export default {

    namespace: 'courseManage',

    state: {
        /*base*/
        namespace : 'courseManage',     //当前state的namespace

        /*search*/
        fastSearchObj : {},             //快捷搜索内容对象

        /*table*/
        loading : false,                //列表加载状态
        dataSource : [],                //列表数据

        /*pagination*/
        num : 1,                        //当前页码
        row : 10,                       //每页条数
        total : 0,                      //总共数据条数

        /*课程新增编辑modal*/
        courseAddOrEditModalCourseLevel : window.courseLevel,   //课程等级
        courseAddOrEditModalType : undefined,                   //modal类型(add/edit)
        courseAddOrEditModalVisible : false,                    //modal是否显示
        courseAddOrEditModalLoading : false,                    //modal加载状态
        courseAddOrEditModalButtonLoading : false,              //添加编辑课程按钮加载状态
        courseAddOrEditModalData : {},                          //编辑时回填数据
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if( pathname === '/sys_setting' ) {
                    //系统设置 -> 课程设置列表查询
                    dispatch({
                        type : 'GetTableList',
                        payload : { initEnter : true }
                    })
                }
            });
        },
    },

    effects: {
        //系统设置 -> 课程管理列表查询
        *'GetTableList'({ payload }, { call, put, select, take }) {
            yield put({ type : 'updateState' , payload : { loading : true } });
            let format_payload = payload || {};
            let state = yield select( state => state.courseManage );
            let fastSearchObj = format_payload && !!format_payload.initEnter ? {} : format_payload && format_payload.fastSearchObj ? format_payload.fastSearchObj : state.fastSearchObj;
            format_payload.num = format_payload && !!format_payload.initEnter ? 1 : (format_payload.num || state.num || 1);
            format_payload.row = format_payload && !!format_payload.initEnter ? 10 : (format_payload.row || state.row || 10);
            delete format_payload.initEnter;
            delete format_payload.fastSearchObj;
            let params = { ...format_payload , ...fastSearchObj };
            let res = yield call(GetTableList,params);
            if(!!res && res.ret && res.ret.errorCode === 0){
                let { ret } = res;
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
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取课程管理列表失败');
                yield put({ type : 'clearTable' });
            }
            yield put({ type : 'updateState' , payload : { loading : false , fastSearchObj } });
        },

        //系统设置 -> 课程新增
        *'ItemOnAdd'({ payload }, { call, put, select, take }){
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalLoading : true } });
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalButtonLoading : true } });
            let res = yield call(ItemOnAdd,payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success('课程新增成功');
                yield put({ type : 'resetCourseModal' })
                yield put({ type : 'GetTableList' })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '课程新增失败');
            }
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalLoading : false } });
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalButtonLoading : false } });
        },

        //系统设置 -> 获取课程详情
        *'GetDetail'({ payload }, { call, put, select, take }){
            //获取详情同时打开modal并且开启加载状态，若接口请求完成关闭加载状态并回填，若接口请求失败则报错并关闭modal
            yield put({
                type : 'updateState' ,
                payload : {
                    courseAddOrEditModalType : 'edit',
                    courseAddOrEditModalVisible : true,
                    courseAddOrEditModalLoading : true,
                    courseAddOrEditModalButtonLoading : true
                }
            });
            let res = yield call(GetDetail,payload);;
            if(!!res && res.ret && res.ret.errorCode === 0){
                yield put({
                    type : 'updateState',
                    payload : {
                        courseAddOrEditModalData : res.ret.data || {},
                    }
                })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '课程新增失败');
                yield put({ type : 'updateState' , payload : { courseAddOrEditModalVisible : false } })
            }
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalLoading : false , courseAddOrEditModalButtonLoading : false } })
        },

        //系统设置 -> 课程编辑
        *'ItemOnEdit'({ payload }, { call, put, select, take }){
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalLoading : true } });
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalButtonLoading : true } });
            //判断是直接修改状态还是编辑操作,用来控制成功信息
            let operationType = undefined;
            if(payload && payload.operationType){
                operationType = payload.operationType;
                delete payload.operationType;
            }
            let res = yield call(ItemOnEdit,payload);
            if(!!res && res.ret && res.ret.errorCode === 0){
                message.success(!!operationType ? '状态修改成功' : '编辑成功');
                yield put({ type : 'resetCourseModal' });
                yield put({ type : 'GetTableList' });
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '状态修改失败');
            }
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalLoading : false } });
            yield put({ type : 'updateState' , payload : { courseAddOrEditModalButtonLoading : false } });
        },
    },

    reducers: {
        updateState(state, action) {
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
        //新增编辑课程表单清空
        resetCourseModal(state, action){
            let obj = {
                courseAddOrEditModalVisible : false ,
                courseAddOrEditModalLoading : false,            //modal加载状态
                courseAddOrEditModalButtonLoading : false,      //添加编辑课程按钮加载状态
                courseAddOrEditModalData : {},
            }
            return { ...state , ...obj }
        },
    },

};
