import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import TableTopMessage from '../../common/tableComponent/tableTopMessage/TableTopMessage';
import SourceManageComponent from './sourceManage/SourceManage';
import CourseManageComponent from './courseManage/CourseManage';
import AccountManageComponent from './accountManage/AccountManage';
const TabPane = Tabs.TabPane;

function SysAllManage({ dispatch, sysAllManage }) {

    let {
        /*base*/
        namespace,                      //当前state的namespace

        tabKey,                         //tab的key值
    } = sysAllManage

    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    function ChangeTab(e){ dp(`${namespace}/updateState`, { tabKey : e }) }

    return (
        <div>
            <TableTopMessage>
                <Tabs activeKey = { tabKey } onChange = { ChangeTab }>
                    <TabPane tab = "课程管理" key = "1"/>
                    <TabPane tab = "渠道来源" key = "2"/>
                    <TabPane tab = "账户管理" key = "3"/>
                </Tabs>
            </TableTopMessage>
            { tabKey === '1' ? <CourseManageComponent/> : null }
            { tabKey === '2' ? <SourceManageComponent/> : null }
            { tabKey === '3' ? <AccountManageComponent/> : null }
        </div>
    );
}


function mapStateToProps({ sysAllManage }){
    return { sysAllManage };
}

export default connect(mapStateToProps)(SysAllManage);
