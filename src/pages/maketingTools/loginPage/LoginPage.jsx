import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import Login from '../../../../src/components/maketingTools/login/Login';
import bgImg from '../../../assets/image/bgImg.png';
import styles from './LoginPage.less';

function LoginPage({ dispatch, login }) {
  const {
    namespace // 当前state的namespace
  } = login;
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }

  function _getVeryCode(phone) {
    // 点击获取验证码，发送dispatch
    // console.log(phone)
    dp(`${namespace}/_getVeryCode`, { phone });
  }

  function _loginBtn(phone, smsCode) {
    // 点击登录按钮
    dp(`${namespace}/_loginBtn`, { phone, smsCode });
  }

  const propsText = {
    _getVeryCode, // 点击发送验证码事件
    _loginBtn // 点击登录按钮事件
  };
  return (
    <DocumentTitle title="登录/注册">
      <div className={styles.container}>
        <div>
          <div className={styles.bgImgStyle}>
            <img src={bgImg} alt="" />
          </div>
          <Login {...propsText} />
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(LoginPage);
