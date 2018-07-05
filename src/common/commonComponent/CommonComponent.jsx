import React from 'react';
import Media from "react-media";
import { Popover , Icon } from 'antd';
import nullData from './CommonComponentLess/NullData.less';
import progressBar from './CommonComponentLess/ProgressBar.less';
import blockHelp from './CommonComponentLess/BlockHelp.less';

/*
 * 空数据页面
 * @author zhaojian
 * date 2018/3/20
 * sHeight string/number => ('100px',100) 小屏下高度 默认100 最小100
 * lHeight string/number => ('200px',200) 大屏下高度 默认200 最小200
 * minWidth string/number => ('1366px',1366) 媒体查询临界值 默认1366px
 */
export function NullData({
    sHeight,
    lHeight,
    minWidth,
}) {
    return(
        <Media query = { `(max-width : ${minWidth || window._critical_width})` }>
            { matches =>
                matches ? (
                    <div className = { nullData.null_data } style={{ height : sHeight || 100 , minHeight : 100 }}>
                        <div className = { nullData.s_img }></div>
                    </div>
                ) : (
                    <div className = { nullData.null_data } style={{ height : lHeight || 200 , minHeight : 200 }}>
                        <div className = { nullData.l_img }></div>
                    </div>
                )
            }
        </Media>

    );
}

/*
 * 纯进度条
 * author zhaojian
 * date 2018/3/20
 * type string 种类('move'/默认'fixed')
 * sHeight string/number => ('100px',100) 小屏高度 默认100
 * lHeight string/number => ('200px',200) 大屏高度 默认200
 * content string 进度条内文案(默认'Loading')，优先级高
 * minWidth string/number => ('1366px',1366) 媒体查询临界值 默认1366px
 * children string 进度条内文案(默认'Loading')，优先级低
 * duration string 动画时间(默认4s)
 * timingFunction string 滑动速度曲线
 */
export function ProgressBar({
    type,
    sHeight,
    lHeight,
    content,
    children,
    minWidth,
    duration,
    timingFunction,
}) {
    return(
        <Media query = { `(max-width : ${minWidth || window._critical_width})` }>
            { matches =>
                matches ? (
                    <div className = 'common_progress_bar' style = {{ height : sHeight || 100 }}>
                        <div
                            className={type === 'move' ? progressBar.progress_move : progressBar.progress_fixed}
                            data-content={ content || children || '加载中' }
                            style = {{ animationDuration : duration || '4s' , animationTimingFunction : timingFunction || 'linear' }}>
                        </div>
                    </div>
                ) : (
                    <div className = 'common_progress_bar' style = {{ height : lHeight || 200 }}>
                        <div
                            className={type === 'move' ? progressBar.progress_move : progressBar.progress_fixed}
                            data-content={ content || children || '加载中' }
                            style = {{ animationDuration : duration || '4s' , animationTimingFunction : timingFunction || 'linear' }}>
                        </div>
                    </div>
                )
            }
        </Media>

    );
}

/* 蓝色背景icon
 * author 赵健
 * date 2018/3/22
 * key string 如果放在数组中需要设定key值
 * content string/ReactDom popover内容,优先级高(默认'无内容')
 * children ReactDom popover内容,优先级低(默认'无内容')
 * popoverTrigger string 帮助是鼠标悬浮显示还是点击显示(默认是'hover')
 * popoverPlacement string 帮助框悬浮位置(默认'right)
 * iconType string logo种类(默认是'question-circle-o')
 * className object/string 自定义类名
 * style object 样式
 */
export function BlockHelp({
    content,
    children,
    popoverTrigger,
    popoverPlacement,
    iconType,
    className,
    style
}) {
    let formatClassName = !!className ? ' ' + className : '';
    return(
        <div className = { blockHelp.common_block_help + formatClassName } style = { style }>
            <Popover
                trigger = { popoverTrigger || 'hover' }
                placement = { popoverPlacement || 'right' }
                content = { content || children || '无内容' }
            >
                <Icon type = { iconType || "question-circle-o" }/>
            </Popover>
        </div>
    );
}
