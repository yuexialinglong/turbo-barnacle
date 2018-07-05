import React from 'react'
import style from './Button.less';
/*
 * @param 
 * isSubmit 按钮是否可点击
 * handleSubmit 点击事件
 * text 按钮文案
 */
const Button = props => {
    let button = null;
    if(props.isSubmit) button = <div className={style.submit+' '+style.active} onClick={props.handleSubmit}>{props.text}</div>;
    else button = <div className={style.submit}>{props.text}</div>;
    return button;
}


export default Button;
