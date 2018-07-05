import React from 'react';
import { connect } from 'dva';
import CourseManageTable from '../../../components/sysManage/courseManage/courseManageTable/CourseManageTable';
import CourseAddOrEditModal from '../../../components/sysManage/courseManage/courseAddOrEditModal/CourseAddOrEditModal';

function CourseManage({ dispatch, courseManage }) {

    let {
        /*base*/
        namespace,                              //当前state的namespace

        /*search*/
        fastSearchObj,              //快捷搜索内容对象

        /*table*/
        loading,                    //列表加载状态
        dataSource,                 //列表数据

        /*pagination*/
        num,                        //当前页码
        row,                        //每页条数
        total,                      //总共数据条数

        /*课程新增编辑modal*/
        courseAddOrEditModalCourseLevel,    //课程等级
        courseAddOrEditModalType,           //modal类型(add/edit)
        courseAddOrEditModalVisible,        //modal是否显示
        courseAddOrEditModalLoading,        //modal加载状态
        courseAddOrEditModalButtonLoading,  //添加编辑课程按钮加载状态
        courseAddOrEditModalData,           //编辑时回填数据
    } = courseManage

    //封装dispatch方法
    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //查询触发事件
    function TableOnSearch(data){ dp(`${namespace}/GetTableList`, { num : 1 , row , fastSearchObj : data }) }

    //点击添加课程modal
    function OpenAddCourseModal(type,data){
        dp(`${namespace}/updateState`, {
            courseAddOrEditModalType : 'add',
            courseAddOrEditModalVisible : true
        });
    }

    //点击课程名称打开编辑课程modal
    function OpenEditCourseModal(data){ dp(`${namespace}/GetDetail`, { courseId : data.id }) }

    //分页改变事件
    function TableOnChangePage(num,row){ dp(`${namespace}/GetTableList`, { num , row , fastSearchObj }) }

    //项目变更状态事件
    function ItemOnChangeStatus(data){
        dp(`${namespace}/ItemOnEdit`, {
            courseId : data.id,
            isUse : data.isUse === 1 ? 0 : 1,           //(1启用/0停用)
            operationType : 'changeStatus',             //判断是直接修改状态还是编辑操作,用来控制成功信息
        })
    }

    //课程操作表单提交
    function AddOrEditCourseSubmit(data){
        if(courseAddOrEditModalType === 'add'){
            dp(`${namespace}/ItemOnAdd`,data)
        }else if(courseAddOrEditModalType === 'edit'){
            data.courseId = courseAddOrEditModalData && courseAddOrEditModalData.id !== null && courseAddOrEditModalData.id !== undefined && courseAddOrEditModalData.id + '' || undefined;
            dp(`${namespace}/ItemOnEdit`, data)
        }
    }

    //课程操作表单关闭
    function AddOrEditCourseCancel(){ dp(`${namespace}/resetCourseModal`) }

    //系统设置 -> 课程管理table属性
    let CourseManageTableProps = {
        /*search*/
        fastSearchObj,              //快捷搜索内容对象

        /*table*/
        loading,                    //列表加载状态
        dataSource,                 //列表数据

        /*pagination*/
        num,                        //当前页码
        row,                        //每页条数
        total,                      //总共数据条数

        TableOnSearch,              //查询触发事件
        TableOnChangePage,          //分页改变事件
        ItemOnChangeStatus,         //项目变更状态事件
        OpenAddCourseModal,         //点击添加课程modal
        OpenEditCourseModal,        //点击课程名称打开编辑课程modal
    }

    //系统设置 -> 课程新增编辑modal属性
    let CourseAddOrEditModalProps = {
        courseAddOrEditModalCourseLevel,    //课程等级
        courseAddOrEditModalType,           //modal类型(add/edit)
        courseAddOrEditModalVisible,        //modal是否显示
        courseAddOrEditModalLoading,        //modal加载状态
        courseAddOrEditModalButtonLoading,  //添加编辑课程按钮加载状态
        courseAddOrEditModalData,           //编辑时回填数

        AddOrEditCourseSubmit,              //课程操作表单提交
        AddOrEditCourseCancel,              //课程操作表单关闭
    }

    return (
        <div>
            <CourseManageTable { ...CourseManageTableProps }/>
            <CourseAddOrEditModal { ...CourseAddOrEditModalProps }/>
        </div>
    );
}


function mapStateToProps({ courseManage }){
    return { courseManage };
}

export default connect(mapStateToProps)(CourseManage);
