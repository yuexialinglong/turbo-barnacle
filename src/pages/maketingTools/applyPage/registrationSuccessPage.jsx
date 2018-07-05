import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import success from '../../../assets/image/success.png';
import styles from './registrationSuccessPage.less';

function registrationSuccessPage() {
  return (
    <DocumentTitle title="报名成功">
      <div>
        <div className={styles.cardStyle}>
          <img src={success} alt='' />
          <p>报名成功！</p>
          <p>请耐心等待，我们会在24小时内联系您！</p>
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ registrationSuccess }) {
  return { registrationSuccess };
}

export default connect(mapStateToProps)(registrationSuccessPage);
