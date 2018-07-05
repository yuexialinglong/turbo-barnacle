/*
 * 穿梭框
 * author zhaojian
 * date 2018/3/29
 * style object 自定义样式
 * height number 自定义框的高度
 * defaultHeight number 默认的组件高度
 * title array 自定义穿梭框标题数组
 * defualtTitle array 默认的穿梭框标题数组
 * titleHeight number 自定义标题框的高度
 * defaultTitleHeight number 默认的标题框的高度
 * columns array table标题
 * xScroll number table出现x轴的滚动条的宽度
 * yScroll number table出现y轴的滚动条的高度
 * leftDataSource array 左边穿梭框的数据源
 * rightDataSource array 右边穿梭框的数据源
 * leftSelectKeys array 左边穿梭框选中的key数组
 * rightSelectKeys array 右边穿梭框选中的key数组
 * rowKey string table的主键，并且leftSelectKeys/rightSelectKeys数组中的值是从leftDataSource/rightDataSource相应对象中的这个参数值
 *
 * transferToRight function 点击转入右边
 * transferToLeft function 点击转入左边
 * onLeftSearch function 左边查询事件
 * onRightSearch function 右边查询事件
 */

import React from 'react';
import TableContent from '../../tableComponent/tableContent/TableContent';
import TableSearchBar from '../../tableComponent/tableSearchBar/TableSearchBar';
import styles from './Transfer.less';
import { Button , Icon } from 'antd-mobile';

class Transfer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : this.props.style || {},

            height : this.props.height,
            defaultHeight : 400,

            title : this.props.title,
            defualtTitle : ['左title','右title'],

            titleHeight :  this.props.titleHeight,
            defaultTitleHeight : 40,

            tablePadding : this.props.tablePadding,
            defaultTablePadding : 20,

            columns : this.props.columns || [],
            xScroll : this.props.xScroll,
            yScroll : 200,
            leftDataSource : this.props.leftDataSource || [],
            rightDataSource : this.props.rightDataSource || [],

            leftSelectKeys  : this.props.leftSelectKeys || [],
            leftSelectRows : [],

            rightSelectKeys : this.props.rightSelectKeys || [],
            rightSelectRows : [],

            leftLoading : this.props.leftLoading || false,
            rightLoading : this.props.rightLoading || false,

            rowKey : this.props.rowKey || 'id',

            searchFields : this.props.searchFields || [],
        }
    }

    setTableYScroll(){
        if(document.getElementById('common_transfer')){
            let { titleHeight , defaultTitleHeight , tablePadding , defaultTablePadding , searchFields } = this.state;
            let height = document.getElementById('common_transfer').clientHeight;
            //内部table动态高度 = 总高度 - 标题栏高度 - 内上边距 - 内下边距 - 搜索栏高度 - table中th的高度
            this.setState({ yScroll : height - (titleHeight || defaultTitleHeight) - (tablePadding || defaultTablePadding) * 2 - 45 - (searchFields && searchFields.length > 0 ? 43 : 0)})
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.setTableYScroll());
        this.setTableYScroll();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.setTableYScroll());
    }

    componentWillReceiveProps(nextProps){
        this.setState({ ...nextProps , leftSelectKeys : nextProps.leftSelectKeys || [] , rightSelectKeys : nextProps.rightSelectKeys || [] });
    }

    //复选框onChange统一处理事件
    rowOnChange(keys,rows,keyType,rowType){
        let obj = {};
        obj[keyType] = keys;
        obj[rowType] = rows;
        this.setState(obj);
    }

    //选择左边checkbox事件
    rowSelectLeftChange(){
        this.rowOnChange.apply(this, arguments)
    }

    //选择右边checkbox事件
    rowSelectRightChange(){
        this.rowOnChange.apply(this, arguments)
    }

    //点击右转按钮(参数在组件内部处理了)
    TransferToRight(){
        let { leftSelectKeys , leftSelectRows } = this.state;
        this.setState({ leftSelectKeys : [] });
        this.props.transferToRight && this.props.transferToRight(leftSelectKeys)
    }

    //点击左转按钮(参数在组件内部处理了)
    TransferToLeft(){
        let { rightSelectKeys , rightSelectRows } = this.state;
        this.setState({ rightSelectKeys : [] });
        this.props.transferToLeft && this.props.transferToLeft(rightSelectKeys)
    }

    //搜索框onSearch事件
    onSearch(type,data){
        if(type === 'left'){
            this.props.onLeftSearch && this.props.onLeftSearch(data);
        }else if(type === 'right'){
            this.props.onRightSearch && this.props.onRightSearch(data);
        }
    }

    render(){
        let { style } = this.state;
        let { height , defaultHeight } = this.state;
        let { title , defualtTitle } = this.state;
        let { titleHeight , defaultTitleHeight } = this.state;
        let { tablePadding , defaultTablePadding } = this.state;
        let { columns , xScroll , yScroll , leftDataSource , rightDataSource } = this.state;
        let { leftSelectKeys , rightSelectKeys } = this.state;
        let { leftLoading , rightLoading } = this.state;
        let { rowKey } = this.state;
        let { searchFields } = this.state;
        let searchFieldsFlag = searchFields && searchFields.length > 0;
        return(
            <div className = { styles.all } style = {{ ...style , height : height || style.height || defaultHeight }} id = 'common_transfer'>
                <div className = { styles.left }>
                    <div className = { styles.title } style = {{ height : titleHeight || defaultTitleHeight }}>{ title && title.length == 2 ? title[0] : defualtTitle[0] }</div>
                    { searchFieldsFlag ? <TableSearchBar fields = { searchFields || [] } style = {{ padding : '20px'  }} onSearch = {(data) => this.onSearch('left',data)}/> : null }
                    <div className = { styles.table } style = {{ padding : tablePadding || defaultTablePadding , marginTop : searchFieldsFlag ? -40 : 0 }}>
                        <TableContent
                            rowKey = { rowKey }
                            xScroll = { xScroll }
                            yScroll = { yScroll }
                            loading = { leftLoading }
                            style = {{ width : '100%' }}
                            columns = { columns || [] }
                            dataSource = { leftDataSource || [] }
                            rowKey = 'stuCourseId'
                            rowSelection = {{
                                selectedRowKeys : leftSelectKeys || [],
                                onChange : (keys,rows) => this.rowSelectLeftChange(keys,rows,'leftSelectKeys','leftSelectRows')
                            }}
                        />
                    </div>
                </div>
                <div className = { styles.operation }>
                    <Button type = 'primary' size = 'small' disabled = { !(leftSelectKeys && leftSelectKeys.length > 0) } onClick = {() => this.TransferToRight()}><Icon type = 'right' /></Button>
                    <Button type = 'primary' size = 'small' disabled = { !(rightSelectKeys && rightSelectKeys.length > 0) } onClick = {() => this.TransferToLeft()}><Icon type = 'left' /></Button>
                </div>
                <div className = { styles.right }>
                    <div className = { styles.title } style = {{ height : titleHeight || 40 }}>{ title && title.length == 2 ? title[1] : defualtTitle[1] }</div>
                    { searchFieldsFlag ? <TableSearchBar fields = { searchFields || [] } style = {{ padding : '20px'  }} onSearch = {(data) => this.onSearch('right',data)}/> : null }
                    <div className = { styles.table } style = {{ padding : tablePadding || defaultTablePadding , marginTop : searchFieldsFlag ? -40 : 0 }}>
                        <TableContent
                            rowKey = { rowKey }
                            xScroll = { xScroll }
                            yScroll = { yScroll }
                            loading = { rightLoading }
                            style = {{ width : '100%' }}
                            columns = { columns || [] }
                            dataSource = { rightDataSource || [] }
                            rowKey = 'stuCourseId'
                            rowSelection = {{
                                selectedRowKeys : rightSelectKeys || [],
                                onChange : (keys,rows) => this.rowSelectRightChange(keys,rows,'rightSelectKeys','rightSelectRows')
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Transfer;
