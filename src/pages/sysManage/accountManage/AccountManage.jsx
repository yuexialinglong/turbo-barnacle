import React from 'react';
import { connect } from 'dva';
import AccountManageTable from '../../../components/sysManage/accountManage/accountManageTable/AccountManageTable';
import AccountAddOrEditModal from '../../../components/sysManage/accountManage/accountAddOrEditModal/AccountAddOrEditModal';

function AccountManage({ dispatch, accountManage }) {

    let {
        /*base*/
        namespace,                              //当前state的namespace

        /*search*/
        fastSearchObj,                          //快捷搜索内容对象

        /*table*/
        loading,                                //列表加载状态
        dataSource,                             //列表数据

        /*pagination*/
        num,                                    //当前页码
        row,                                    //每页条数
        total,                                  //总共数据条数

        /*部门数据*/
        departData,                             //部门信息数据

        /*账户新增编辑modal*/
        accountAddOrEditModalType,              //modal类型(add/edit)
        accountAddOrEditModalVisible,           //modal是否显示
        accountAddOrEditModalLoading,           //modal加载状态
        accountAddOrEditModalButtonLoading ,    //modal按钮加载状态
        accountAddOrEditModalData,              //编辑时回填数据
    } = accountManage

    //封装dispatch方法
    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //分页改变事件
    function TableOnChangePage(num,row){
        dp(`${namespace}/GetTableList`,{ num , row , fastSearchObj })
    }

    //点击编辑账户获取账户信息
    function EditAccountGetDetail(id){ dp(`${namespace}/EditAccountGetDetail`,{ id }) }

    //点击删除账户
    function DeleteAccount(id){ dp(`${namespace}/DeleteAccount`, { id }) }

    //点击新增账户
    function AddAccount(){ dp(`${namespace}/updateState`, { accountAddOrEditModalType : 'add' , accountAddOrEditModalVisible : true }) }

    //账户操作表单提交
    function AddOrEditAccountSubmit(data){
        if(accountAddOrEditModalType === 'add'){
            dp(`${namespace}/AddAccountSubmit`, data)
        }else if(accountAddOrEditModalType === 'edit'){
            data.id = accountAddOrEditModalData && accountAddOrEditModalData.id !== null && accountAddOrEditModalData.id !== undefined && accountAddOrEditModalData.id + '' || undefined;
            dp(`${namespace}/EditAccountSubmit`, data)
        }
    }

    //账户操作表单关闭
    function AddOrEditAccountCancel(){ dp(`${namespace}/resetAccountModal`) }

    //系统设置 -> 账户管理table属性
    let AccountManageTableProps = {
        /*search*/
        fastSearchObj,                          //快捷搜索内容对象

        /*table*/
        loading,                                //列表加载状态
        dataSource,                             //列表数据

        /*pagination*/
        num,                                    //当前页码
        row,                                    //每页条数
        total,                                  //总共数据条数

        /*部门数据*/
        departData,                             //部门信息数据

        TableOnChangePage,                      //分页改变事件
        AddAccount,                             //点击新增账户
        EditAccountGetDetail,                   //点击编辑账户获取账户信息
        DeleteAccount,                          //点击删除账户
    }

    let AccountAddOrEditModalProps = {
        /*部门数据*/
        departData,                             //部门信息数据

        /*账户新增编辑modal*/
        accountAddOrEditModalType,              //modal类型(add/edit)
        accountAddOrEditModalVisible,           //modal是否显示
        accountAddOrEditModalLoading,           //modal加载状态
        accountAddOrEditModalButtonLoading ,    //modal按钮加载状态
        accountAddOrEditModalData,              //编辑时回填数据

        AddOrEditAccountSubmit,                 //账户操作表单提交
        AddOrEditAccountCancel,                 //账户操作表单关闭
    }

    return (
        <div>
            <AccountManageTable { ...AccountManageTableProps }/>
            <AccountAddOrEditModal { ...AccountAddOrEditModalProps }/>
        </div>
    );
}


function mapStateToProps({ accountManage }){
    return { accountManage };
}

export default connect(mapStateToProps)(AccountManage);
