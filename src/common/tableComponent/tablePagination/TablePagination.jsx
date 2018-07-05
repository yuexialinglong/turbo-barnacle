/*
* 表格 分页组件
*  @authot yhWu
*  date 2018/03/21

* num       类型Number 分页页码
* row       类型Number 分页大小
* total     类型Number 数据总数
* showTotal 类型String 共多少数据
* numChange 类型Function 页面改变的回调
* rowChange 类型Function 页面大小改变的回调
*/

import React from 'react';
import { Pagination } from 'antd';
import styles from './TablePagination.less';

export default function TablePagination({
    num,                //分页页码 number
    row,                //分页大小 number
    total,              //数据总数
    showTotal,          //共多少数据

    //方法
    numChange,          //页码改变的回调
    rowChange,          //页面大小改变的回调

    style,              //自定义样式
}){

    return(
        <div className = 'common_pagination' style = { style || {} }>
            <Pagination
                size = 'small'
                pageSize = { row || 10 }
                current = { num || 1 }
                //showSizeChanger
                total = { total || 10 }
                onChange = { numChange }
                onShowSizeChange = { rowChange }
            />
            <div className = { styles.show_total } >{ showTotal }</div>
        </div>
    )
}
