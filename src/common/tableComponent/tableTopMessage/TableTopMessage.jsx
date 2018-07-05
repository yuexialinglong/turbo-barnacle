/*
 * table最上端折角区域
 * author zhaojian
 * date 2018/3/20
 * children ReactDOM 节点子元素
 * allClassName object || string 最外层div类名
 * allStyle object 最外层div样式
 * angleClassName object || string 折角区div类名
 * angleStyle object 折角区div样式
 * contentClassName object || string 内容div类名
 * contentStyle object 内容div样式
 */

import React from 'react';
import styles from './TableTopMessage.less';

export default function TableTopMessage({
    children,
    allClassName,
    allStyle,
    angleClassName,
    angleStyle,
    contentClassName,
    contentStyle,
}){
    let formatAllClassName = !!allClassName ? ' ' + allClassName : '';
    let formatAngleClassName = !!angleClassName ? ' ' + angleClassName : '';
    let formatContentClassName = !!contentClassName ? ' ' + contentClassName : '';

    let imgWidth = angleStyle && angleStyle.width || '2.9rem';
    let imgHeight = angleStyle && angleStyle.height || '2.65rem';

    return(
        <div className = { styles.all + ' common_table_top_message' + formatAllClassName } style = { allStyle }>
            <div className = { styles.angle_img + formatAngleClassName } style = {{ ...angleStyle , width : imgWidth , height : imgHeight }} onMouseDown = {(ev) => window.mouseRotate(ev,'table_all')}>
            </div>
            <div className = { styles.content + formatContentClassName } style = {{ ...contentStyle , width : `calc(100% - ${imgWidth})` }}>
                { children }
            </div>
        </div>
    )
}
