import React from 'react';
import TableSearchBar from '../../../../common/tableComponent/tableSearchBar/TableSearchBar';
import TableContent from '../../../../common/tableComponent/tableContent/TableContent';
import TablePagination from '../../../../common/tableComponent/tablePagination/TablePagination';
import styles from './AccountManageTable.less';
import { Popover , Popconfirm , Icon } from 'antd';

function AccountManageTable({
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
}){

    let columns = [{
            key : 'cnName',
            dataIndex : 'cnName',
            title : '姓名',
            width : 160,
            render : (text, record) => (<Popover content = { text }><a onClick = {() => EditAccountGetDetail(record.id)}>{ text }</a></Popover>)
        },{
            key : 'deptId',
            dataIndex : 'deptId',
            title : '部门',
            width : 160,
            render : (text, record) => {
                let render_item = undefined;
                if(departData && departData.length > 0){
                    for(let i = 0 ; i < departData.length ; i++){
                        if(text === departData[i].id){ render_item = departData[i].name; break; }
                    }
                }
                return <Popover content = { render_item }>{ render_item }</Popover>
            }
        },{
            key : 'phone',
            dataIndex : 'phone',
            title : '手机号',
            width : 160,
            render : (text, record) => (<Popover content = { text }>{ text }</Popover>)
        },{
            key : 'operation',
            dataIndex : 'operation',
            title : '操作',
            width : 200,
            render : (text, record) => (
                <div>
                    <Icon type = 'edit' className = { styles.icon } onClick = {() => EditAccountGetDetail(record.id)}/>
                    <Popconfirm placement = 'top' title = { <div>确定要删除&nbsp;<RedCrude>{ record.cnName }</RedCrude>&nbsp;吗</div> } onConfirm = {() => DeleteAccount(record.id)} okText = '是' cancelText = '否'>
                        <Icon type = 'delete' className = { styles.icon }/>
                    </Popconfirm>
                </div>
            )
        }
    ];

    function RedCrude({ children }){
        return <span className = { styles.red_crude }>{ children }</span>;
    }

    return(
        <div>
            <TableSearchBar
                searchObj = { fastSearchObj }
                showDefaultBtn = { false }
                btns = {[{ label : '新增账户' , icon : 'plus' , handle : () => AddAccount() }]}
            />
            <TableContent
                loading = { loading }
                xScroll = { window.calcWidth(columns) }
                dataSource = { dataSource }
                columns = { columns }
            />
            <TablePagination num = { num } row = { row } total = { total } showTotal = { `共${total}条账户数据` } numChange = { TableOnChangePage }/>
        </div>
    )
}

export default AccountManageTable;
