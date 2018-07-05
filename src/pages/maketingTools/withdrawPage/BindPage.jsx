import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import BindAlipay from '../../../components/maketingTools/withdraw/BindAlipay';
import style from './AlipayPage';

function BindPage({ dispatch, alipay }) {
  const { namespace } = alipay;
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _getVeryCode(phone) {
    // 点击获取验证码，发送dispatch
    // console.log(phone)
    dp(`${namespace}/_getVeryCode`, { phone });
  }
  function _bindAlipay(params) {
    // 绑定支付宝，发送dispatch
    dp(`${namespace}/_bindAlipay`, { params });
  }
  const propsObj = {
    _getVeryCode,
    _bindAlipay
  };
  return (
    <DocumentTitle title="支付宝绑定">
      <div className={style.container}>
        <BindAlipay {...propsObj} />
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ alipay }) {
  return { alipay };
}

export default connect(mapStateToProps)(BindPage);
