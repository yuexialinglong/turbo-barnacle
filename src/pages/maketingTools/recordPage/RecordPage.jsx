import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import RegistrationRecord from '../../../components/maketingTools/record/RegistrationRecord';
import InvitedRecord from '../../../components/maketingTools/record/invitedRecord';
import styles from './RecordPage.less';

function RecordPage({ dispatch, record }) {
  const {
    namespace, // 当前state的namespace
    currentPage,
    invitedRecord,
    registrationRecord
  } = record;
  // console.log(registrationRecord,'招生记录=========')
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _registrationRecord() {
    dp(`${namespace}/_registrationRecord`);
  }
  function _invitedRecord() {
    dp(`${namespace}/_invitedRecord`);
  }
  const registrationStyle = currentPage === 1 ? styles.selected : styles.registrationRecord; // 报名记录
  const invitedRecordStyle = currentPage === 2 ? styles.selected : styles.invitedRecord; // 邀请记录
  return (
    <DocumentTitle title="记录">
      <div className={styles.container}>
        <div>
          <div className={styles.record}>
            <span className={registrationStyle} onClick={_registrationRecord}>
              报名记录
            </span>
            <span className={invitedRecordStyle} onClick={_invitedRecord}>
              邀请记录
            </span>
          </div>
          <div>
            {currentPage === 1 ? (
              <RegistrationRecord data={registrationRecord} />
            ) : (
              <InvitedRecord data={invitedRecord} />
            )}
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ record }) {
  return { record };
}

export default connect(mapStateToProps)(RecordPage);
