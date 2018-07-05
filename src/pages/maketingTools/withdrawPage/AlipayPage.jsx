import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import Alipay from '../../../components/maketingTools/withdraw/Alipay';
import style from './AlipayPage.less';

function AlipayPage({ alipay }) {
  const { acount } = alipay;
  const propsObj = {
    acount
  };
  return (
    <DocumentTitle title="支付宝">
      <div className={style.container}>
        <Alipay {...propsObj} />
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ alipay }) {
  return { alipay };
}

export default connect(mapStateToProps)(AlipayPage);
