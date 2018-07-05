import React from 'react';
import { connect } from 'dva';
import Success from '../../../components/maketingTools/withdraw/Success';
import style from './Success.less';

function SuccessPage({ alipay }) {
  const { pageType } = alipay;
  const propsObj = {
    pageType
  };
  return (
    <div className={style.container}>
      <Success {...propsObj} />
    </div>
  );
}

function mapStateToProps({ alipay }) {
  return { alipay };
}

export default connect(mapStateToProps)(SuccessPage);
