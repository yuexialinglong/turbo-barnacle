import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './SetUserName.less';

function SetUserName({
  _previewClick,
  _saveClick,
  _onBlur,
  form: {
    getFieldDecorator, // input 绑定数据源
    getFieldValue // 手机号
  },
  setUserName
}) {
  const { btnsaveText,bottomText } = setUserName;
  let defaultCnName =
    (window.localStorage &&
      window.localStorage.userInfo &&
      JSON.parse(window.localStorage.userInfo).cnName) ||
    '';
  return (
    <div className={styles.container}>
      <div className={styles.setUserName}>
        {/* defaultValue={JSON.parse(window.localStorage.userInfo).cnName} */}
        {getFieldDecorator('cnName', {
          rules: [{ required: true, message: '填写用户名（必填）' }]
        })(<InputItem
          className={styles.inputStyle}
          defaultValue={defaultCnName}
          placeholder="填写用户名（必填）"
          onChange={_onBlur}
        />)}
      </div>
      <p className={styles.codeStyle}>*用户名将用于分享页面标题</p>
      <div className={styles.btn}>
        <button className={styles.previewBtnStyle} onClick={_previewClick}>
          预览
        </button>
        <button className={styles.btnStyle} onClick={() => _saveClick(getFieldValue('cnName'))}>
          {btnsaveText}
        </button>
      </div>
      {bottomText?<div className={styles.bottomTextStyle}>
       点击保存并注册后，请关注公众号并点击“我的钱包”
      </div>:''}
    </div>
  );
}
function mapStateToProps({ setUserName }) {
  return { setUserName };
}
export default connect(mapStateToProps)(createForm()(SetUserName));
