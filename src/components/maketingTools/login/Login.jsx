import React from 'react';
import { connect } from 'dva';
import { Toast,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import phoneIcon from '../../../assets/image/phoneIcon.png';
import codeIcon from '../../../assets/image/codeIcon.png';
import GetVerCode from '../../../common/commonComponent/GetVerCode/GetVerCode';
import styles from './Login.less';

function Login({
  _getVeryCode,
  _loginBtn,
  form: {
    getFieldDecorator, // input 绑定数据源
    getFieldValue // 手机号
  },
  login
}) {
  const { btnText } = login;
  return (
    <div className={styles.container}>
      <div className={styles.inputCard}>
        <div className={styles.phoneBorder}>
          <img src={phoneIcon} className={styles.iconStyle} alt="" />
          <label className={styles.phoneLabel}>+86</label>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }]
          })(<InputItem type='phone' className={styles.inputStyle} placeholder="请输入手机号" />)}
        </div>
        <div className={styles.phone}>
          <div className={styles.phoneLeftStyle}>
            <img src={codeIcon} className={styles.icon2Style} alt=""/>
            {getFieldDecorator('smsCode', {
              rules: [{ required: true, message: '请输入验证码' }]
            })(<input className={styles.codeInputStyle} placeholder="请输入验证码" />)}
          </div>

          {/* <input className={styles.inputStyle} type='text' placeholder="请输入验证码"/> */}
          {/* <input type='button' className={styles.codeStyle} value='获取验证码' onClick={(e)=>_codeClick(e)}/> */}
          <GetVerCode time={60} startCountFn={_codeClick} />
        </div>
      </div>

      <div className={styles.btn}>
        <button className={styles.loginBtn} onClick={_verify}>
          {btnText}
        </button>
      </div>
    </div>
  );
  // //获取验证码操作
  function _codeClick() {
    // if (!/^1[0-9]{10}$/.test(getFieldValue('phone'))) {
    //   Toast.fail('请输入正确的手机号！');
    //   return false;
    // }
    _getVeryCode(getFieldValue('phone'));
    // return true;
  }
  function _verify() {
    // if (!/^1[0-9]{10}$/.test(getFieldValue('phone'))) {
    //   Toast.fail('请输入正确的手机号！');
    // } else 
    if (!getFieldValue('smsCode')) {
      Toast.fail('请先填写验证码！');
    }else{
      _loginBtn(getFieldValue('phone'), getFieldValue('smsCode'));
    }
   
  }
}
function mapStateToProps({ login }) {
  return { login };
}
export default connect(mapStateToProps)(createForm()(Login));
