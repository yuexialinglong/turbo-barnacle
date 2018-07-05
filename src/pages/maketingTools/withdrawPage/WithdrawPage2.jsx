import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import WithdrawApply from '../../../components/maketingTools/withdraw/WithdrawApply';
import style from './WithdrawPage.less';

function WithdrawPage2({ dispatch, alipay }) {
  const userInfo = JSON.parse(window.localStorage.userInfo) || {};
  const {
    namespace // 当前state的namespace
  } = alipay;
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _withdrawApply(params) {
    dp(`${namespace}/_withdrawApply`, { params });
  }
  function _getVeryCode(phone) {
    // 点击获取验证码，发送dispatch
    // console.log(phone)
    dp(`${namespace}/_getVeryCode`, { phone });
  }
  const propsObj = {
    accountName: userInfo.accountName,
    accountNumber: userInfo.accountNumber,
    id: userInfo.id,
    balance: userInfo.balance || 0,
    _withdrawApply,
    _getVeryCode
  };
  return (
    <DocumentTitle title="提现">
      <div className={style.container}>
        <WithdrawApply {...propsObj} />
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ alipay }) {
  return { alipay };
}

export default connect(mapStateToProps)(WithdrawPage2);
