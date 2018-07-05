import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Withdraw from '../../pages/maketingTools/withdrawPage/WithdrawPage';
import WithdrawPage2 from '../../pages/maketingTools/withdrawPage/WithdrawPage2';
import AlipayPage from '../../pages/maketingTools/withdrawPage/AlipayPage';
import BindPage from '../../pages/maketingTools/withdrawPage/BindPage';
import MinePage from '../../pages/maketingTools/minePage/MinePage';
import Success from '../../pages/maketingTools/withdrawPage/SuccessPage';
import LoginPage from '../../pages/maketingTools/loginPage/LoginPage';//登录或注册
import SetUserNamePage from '../../pages/maketingTools/loginPage/SetUserNamePage'//设置用户名
import PreviewPage from '../../pages/maketingTools/loginPage/PreviewPage'; //预览邀请学生页面
import ApplyPage from '../../pages/maketingTools/applyPage/ApplyPage'; //立即报名页面
import MessagePage from '../../pages/maketingTools/applyPage/MessagePage'; //填写报名信息
import InvitationLetterPage from '../../pages/maketingTools/invitationPage/InvitationLetterPage';//立即邀请页面
import ParticipatePage from '../../pages/maketingTools/invitationPage/ParticipatePage';//立即注册
import RecordPage from '../../pages/maketingTools/recordPage/RecordPage';  //报名记录，邀请记录   currentPage:1  报名记录     2  邀请记录
import registrationSuccessPage from '../../pages/maketingTools/applyPage/registrationSuccessPage' //报名成功页面
import InfoMessagePage from '../../pages/maketingTools/applyPage/InfoMessage';//基本报名信息
import Rules from '../../components/maketingTools/Rules';//用户协议
import FocusCodePage from '../../pages/maketingTools/invitationPage/FocusCodePage'
function RouterConfig({ history }) {
    return (
        <Router history = { history } >
            <Switch>
                <Route path = '/' exact component = { LoginPage }/>
                <Route path = '/login' exact component = { LoginPage }/>
                <Route path = '/withdraw' exact component = { Withdraw }/> {/*提现主页*/}
                <Route path = '/withdrawApply' exact component = { WithdrawPage2 }/> {/*提现申请*/}
                <Route path = '/alipay' exact component = { AlipayPage }/> {/*支付宝*/}
                <Route path = '/success' exact component = { Success }/> {/*提现成功，绑定成功*/}
                <Route path = '/bindAlipay' exact component = { BindPage }/> {/*绑定支付宝*/}
                <Route path = '/mine' exact component = { MinePage }/>   {/*我的招生，我的主页*/}
                <Route path = '/focusCode' exact component = { FocusCodePage }/>
                <Route path = '/setUserName' exact component = { SetUserNamePage }/>
                <Route path = '/preview' exact component = { PreviewPage }/>
                <Route path = '/apply' exact component = { ApplyPage }/>
                <Route path = '/message' exact component = { MessagePage }/>
                <Route path = '/invitationletter' component = { InvitationLetterPage }/>
                <Route path = '/participate' exact component = { ParticipatePage }/>
                <Route path = '/record' exact component = { RecordPage }/>
                <Route path = '/infoMessage' exact component = { InfoMessagePage }/>
                <Route path = '/registrationSuccess' exact component = { registrationSuccessPage }/>
                <Route path = '/rules' exact component = { Rules }/>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
