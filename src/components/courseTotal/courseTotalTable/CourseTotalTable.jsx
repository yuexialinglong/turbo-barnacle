import React from 'react';
import moment from 'moment';
import TableTopMessage from '../../../common/tableComponent/tableTopMessage/TableTopMessage';
import TableSearchBar from '../../../common/tableComponent/tableSearchBar/TableSearchBar';
import TableContent from '../../../common/tableComponent/tableContent/TableContent';
import TablePagination from '../../../common/tableComponent/tablePagination/TablePagination';
import { Popover , Popconfirm } from 'antd';
import message from './message.json';
import styles from './CourseTotalTable.less';

export default function StuArrangeTable({
    /*base*/
    dayReport,                      //每日课表统计数据
    nowDate,                        //当前日期与周几

    /*search*/
    teacherSum,                     //老师摘要信息
    classSum,                       //班级摘要信息
    courseSum,                      //课程摘要信息
    timeRange,                      //上课时间信息
    courseStatus,                   //课次状态信息
    fastSearchObj,                  //快捷搜索内容对象
    defaultSearchObj,               //默认搜索条件

    /*table*/
    loading,                        //列表加载状态
    dataSource,                     //列表数据

    /*pagination*/
    num,                            //当前页码
    row,                            //每页条数
    total,                          //总共数据条数

    TableOnSearch,                  //列表查询事件
    TableOnChangePage,              //分页改变事件
    cancelCourse,                   //待上课课程 取消
}){

    let columns = [{
            key : 'schedSpan',
            dataIndex : 'schedSpan',
            title : '上课时段',
            width : 160
        },{
            key : 'courseCnName',
            dataIndex : 'courseCnName',
            title : '课程名称',
            width : 160
        },{
            key : 'classCnName',
            dataIndex : 'classCnName',
            title : '班级',
            width : 160,
            render : (text, record) => (<Popover content = { text }>{ text }</Popover>)
        },{
            key : 'tchEnName',
            dataIndex : 'tchEnName',
            title : '外教',
            width : 200,
//                        render : (stext, record) => (<Popover content = { text }>{ text }</Popover>)
        },{
            key : 'status',
            dataIndex : 'status',
            title : '状态',
            width : 200,
            render : ( text, record ) => {
                let title = `是否确定将 ${record.classCnName} 在 ${record.classTime} 这次课取消? (取消后状态不可更改)`;
                return (
                    <span>
                        {
                            text === 0 ? '未确认'
                            : text === 1 ? <Popconfirm title = { title } onConfirm = { () => cancelCourse( record.id ) } okText = '确认' cancelText = '取消' >
                                                <a style = {{ border : '1px solid #1890ff', borderRadius : '3px', padding : '0 5px' }} >待上课</a>
                                           </Popconfirm>
                            : text === 2 ? '上课中'
                            : text === 3 ? <span style = {{ color : '#309212' }} >正常结束</span>
                            : text === 4 ? <span style = {{ color : '#ff0000' }} >因故取消</span> : ''
                        }
                    </span>
                )

            }
        }
    ]

    function FormatMessage(expect,target){
        return expect && expect.map((item,index) => {
            let render_item = target[item.key] !== null && target[item.key] !== undefined ? target[item.key] + '' : '--';
            return(
                <div key = { item.key } className = { styles.message_item } data-label = { item.label + '：' }>
                    { render_item }
                </div>
            )
        });
    }

    return(
        <div>
            <TableTopMessage contentClassName = { styles.top_message }>
                <div>{ nowDate }</div>
                { FormatMessage(message,dayReport) }
            </TableTopMessage>
            <TableSearchBar
                onSearch = { TableOnSearch }
                searchObj = { fastSearchObj }
                superFields = {[
                    { key : 'courseId' , type : 'select' , placeholder : '请选择课程' , label : '课程' , options : courseSum , opt_key : 'id' , opt_label : 'cnName' },
                    { key : 'schId' , type : 'select' , placeholder : '请选择上课时间' , label : '上课时间' , options : timeRange },
                    { key : 'statuss' , type : 'select' , placeholder : '请选择课次状态' , label : '课次状态' , options : courseStatus },
                ]}
                fields = {[
                    { key : 'dateStrs' , type : 'datePicker' , placeholder : '请选择上课日期' , initialValue : moment(defaultSearchObj.dateStrs,'YYYY-MM-DD') },
                    { key : 'tchId' , type : 'select' , placeholder : '请选择老师' , options : teacherSum , opt_key : 'id' , opt_label : 'enName' },
                    { key : 'classId' , type : 'select' , placeholder : '请选择班级' , options : classSum , opt_key : 'id' , opt_label : 'cnName' },
                ]}
            />
            <TableContent
                loading = { loading }
                xScroll = { window.calcWidth(columns) }
                dataSource = { dataSource }
                columns = { columns }
            />
            <TablePagination num = { num } row = { row } total = { total } showTotal = { `共${total}条数据` } numChange = { TableOnChangePage }/>
        </div>
    )
}
