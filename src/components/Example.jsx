import React from 'react';
import { connect } from 'dva';
import { Button,InputItem ,List  } from 'antd-mobile';
import { createForm } from 'rc-form';

export default function Example({text2}){
        return(
            <div>
                <List >
                  <InputItem type='phone' placeholder="请输入手机号">手机号</InputItem>
                  <InputItem type='number' placeholder="验证码"></InputItem>
                  <InputItem type='text' placeholder="创建用户名（必填）"></InputItem>
                  <p>用户名将应用于分享页面标题</p>
                </List>
                <Button type="warning">{text2}</Button>
            </div>
        )
}
















