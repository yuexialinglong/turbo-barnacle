import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import focusCode from '../../../assets/image/focusCode.png';
import success from '../../../assets/image/success.png'
import styles from './FocusCodePage.less';

function FocusCodePage({ dispatch }) {
  return (
  <DocumentTitle title = '注册成功'>
    <div>
      <div className={styles.cardStyle}>
        <img src={success} alt='' />
        <p>注册成功！</p>
      </div>
      <div className={styles.focusStyle}>
        <img src={focusCode} alt='' />
        <p>请长按图片，关注“熊猫生源宝”服务号</p>
        <p>查看新手介绍，开启您的收益之旅！</p>
      </div>
    </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ participate }) {
  return { participate };
}

export default connect(mapStateToProps)(FocusCodePage);
