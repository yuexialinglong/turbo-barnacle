import React from 'react';
import { connect } from 'dva';
import SourceManageTable from '../../../components/sysManage/sourceManage/sourceManageTable/SourceManageTable';
import SourceAddModal from '../../../components/sysManage/sourceManage/sourceAddModal/SourceAddModal';

function SourceManage({ dispatch, sourceManage }) {

    let {
        /*base*/
        namespace,                              //当前state的namespace

        /*search*/
        fastSearchObj,                          //快捷搜索内容对象

        /*pagination*/
        num,                                    //当前页码
        row,                                    //每页条数
        total,                                  //总共数据条数

        /*table*/
        loading,                                //列表加载状态
        dataSource,                             //项目列表数据

        /*项目编辑*/
        editChoosedItem,                        //编辑下选择中项的属性

        /*项目添加modal*/
        sourceType,                             //用户来源渠道
        sourseAddModalVisible,                  //modal是否显示
        sourseAddModalLoading,                  //modal加载状态
        sourseAddModalButtonLoading,            //modal提交按钮加载状态
    } = sourceManage

    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //列表分页改变
    function TableOnChangePage(num,row){
        dp(`${namespace}/GetTableList`, {
            num,
            row,
            fastSearchObj
        })
    }

    //项目点击添加
    function ItemOnAddOrCancel(){ dp(`${namespace}/updateState`,{ sourseAddModalVisible : true }) }

    //项目点击编辑
    function ItemOnEdit(data){ dp(`${namespace}/updateState`,{ editChoosedItem : data }) }

    //项目编辑保存
    function ItemEditSave(data,new_name){ dp(`${namespace}/ItemEditSave`, { ...data , name : new_name }) }

    //项目取消编辑
    function ItemCancelEdit(){ dp(`${namespace}/updateState`,{ editChoosedItem : {} }) }

    //项目点击删除
    function ItemOnDelete(id){ dp(`${namespace}/ItemOnDelete`,{ id }) }

    //新增来源表单提交
    function AddSourseModalSubmit(data){ dp(`${namespace}/AddSourseModalSubmit`, data) }

    //新增来源表单关闭
    function AddSourseModalCancel(){ dp(`${namespace}/resetSourceModal`) }

    //来源属性
    let SourceManageTableProps= {
        /*search*/
        fastSearchObj,                          //快捷搜索内容对象
        /*pagination*/
        num,                                    //当前页码
        row,                                    //每页条数
        total,                                  //总共数据条数

        /*table*/
        loading,                                //列表加载状态
        dataSource,                             //项目列表数据

        /*项目编辑*/
        editChoosedItem,                        //编辑下选择中项的属性

        /*方法操作*/
        TableOnChangePage,                      //列表分页改变
        ItemOnAddOrCancel,                      //项目点击添加
        ItemOnEdit,                             //项目点击编辑
        ItemCancelEdit,                         //项目取消编辑
        ItemEditSave,                           //项目编辑保存
        ItemOnDelete,                           //项目点击删除
    }

    //添加来源modal属性
    let SourceAddModalProps = {
        sourceType,                             //用户来源渠道
        sourseAddModalVisible,                  //modal是否显示
        sourseAddModalLoading,                  //modal加载状态
        sourseAddModalButtonLoading,            //modal提交按钮加载状态

        AddSourseModalSubmit,                   //新增来源表单提交
        AddSourseModalCancel,                   //新增来源表单关闭
    }

    return (
        <div>
            <SourceManageTable { ...SourceManageTableProps }/>
            <SourceAddModal { ...SourceAddModalProps }/>
        </div>
    );
}


function mapStateToProps({ sourceManage }){
    return { sourceManage };
}

export default connect(mapStateToProps)(SourceManage);
