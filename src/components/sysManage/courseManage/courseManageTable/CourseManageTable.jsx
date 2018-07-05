import React from 'react';
import TableSearchBar from '../../../../common/tableComponent/tableSearchBar/TableSearchBar';
import TableContent from '../../../../common/tableComponent/tableContent/TableContent';
import TablePagination from '../../../../common/tableComponent/tablePagination/TablePagination';
import fields from './SearchFields.json';
import { Popover , Switch } from 'antd';

export default function CourseManageTable({
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
}){

    let columns = [{
            key : 'cnName',
            dataIndex : 'cnName',
            title : '课程名称',
            width : 160,
            render : (text, record) => (
                <Popover content = { text }>
                    <a onClick = {() => OpenEditCourseModal(record)}>{ text }</a>
                </Popover>
            )
        },{
            key : 'amount',
            dataIndex : 'amount',
            title : '价格',
            width : 160,
            render : (text, record) => (
                <Popover content = { !isNaN(text + '') ? (Number(text)/100).toFixed(2) : '' }>
                    { !isNaN(text + '') ? (Number(text)/100).toFixed(2) : '' }
                </Popover>
            )
        },{
            key : 'stuCnt',
            dataIndex : 'stuCnt',
            title : '在读学员数',
            width : 160,
            render : (text, record) => (<Popover content = { text }>{ text }</Popover>)
        },{
            key : 'isUse',
            dataIndex : 'isUse',
            title : '启用状态',
            width : 160,
            render : (text, record) => (
                <div>
                    <Switch style = {{ width : 50 }} checked = { text === 1 ? true : false } size = 'small' checkedChildren = '启用' unCheckedChildren = '停用' onClick = {() => ItemOnChangeStatus(record)}/>
                </div>
            )
        }
    ]

    return(
        <div>
            <TableSearchBar
                fields = { fields }
                searchObj = { fastSearchObj }
                onSearch = { TableOnSearch }
                btns = {[{ label : '添加课程' , icon : 'plus' , handle : () => OpenAddCourseModal() }]}
            />
            <TableContent
                loading = { loading }
                xScroll = { window.calcWidth(columns) }
                dataSource = { dataSource }
                columns = { columns }
            />
            <TablePagination num = { num } row = { row } total = { total } showTotal = { `共${total}条课程数据` } numChange = { TableOnChangePage }/>
        </div>
    )
}

