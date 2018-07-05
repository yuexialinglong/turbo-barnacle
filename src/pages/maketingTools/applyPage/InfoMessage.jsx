import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Toast, InputItem, Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './InfoMessage.less';

function InfoMessagePage({
  dispatch,
  infoMessage,
  form: { getFieldDecorator, getFieldValue, validateFields ,setFieldsValue}
}) {
  // let array = [
  //     { id : 'phone' , message : '请输入手机号' }
  // ]
  // const cnName =
  //   (window.localStorage &&
  //     window.localStorage.userInfo &&
  //     JSON.parse(window.localStorage.userInfo).cnName) ||
  //   '';
  const {
    namespace, // 当前state的namespace
    data,
    dataTime,
    cols,
    // applyCnName,
    // asyncValue
  } = infoMessage;
  // console.log(data,'数据源')
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _btnClick(e) {
    e.preventDefault();
    let data;
    validateFields((error, values) => {
      if (error && Object.keys(error).length > 0) {
        for (const i in error) {
          // console.info(error[i])
          Toast.fail(error[i].errors[0].message);
          return;
        }
      }
      data = { ...values };
      data.householderPhone = window.specialTrim(data.householderPhone,1);
      if (!/^1[0-9]{10}$/.test(data.householderPhone)) {
          Toast.fail('请输入正确的手机号！');
      }else{
          dp(`${namespace}/_btnClick`, data);
      }
      
    });
    // data.householderPhone = window.specialTrim(data.householderPhone,1)
    // data = { ...data, age: asyncValue[0] };

    // if (!/^1[0-9]{10}$/.test(getFieldValue('householderPhone'))) {
    //   Toast.fail('请输入正确的手机号！');
    // } else 
    // if (!data.age) {
    //   Toast.fail('请选择年龄！');
    // } else {
     
    // }
  }
  function _onPickerChange(val) {
    // console.log(val,'change');
    // dp(`${namespace}/updateState`, { asyncValue: val });
    setFieldsValue({age:val})
  }
  function _onPickerTimeChange(val) {
    // console.log(val,'change');
    // dp(`${namespace}/updateState`, { asyncValue: val });
    setFieldsValue({learnDuration:val})
  }
  let  applyCnName =  window.sessionStorage.getItem("applyCnName")
  return (
    <DocumentTitle title={`${applyCnName}邀您体验`}>
      <div className={styles.messagePage}>
        <div className={styles.inputMsgStyle}>
          <div className={styles.phone}>
            <span className={styles.required}>*</span>
            <label>学员姓名：</label>
            {getFieldDecorator('stuName', {
              rules: [{ required: true, message: '请输入学员姓名' }]
            })(<InputItem className={styles.inputStyle} placeholder="请输入学员姓名"  />)}
          </div>
          <div className={styles.phone}>
            <span className={styles.required}>*</span>
            <label>手机号：</label>
            {getFieldDecorator('householderPhone', {
              rules: [{ required: true, message: '请输入手机号' }]
            })(<InputItem type='phone' className={styles.inputStyle} placeholder="请输入手机号" />)}
          </div>
          <div className={styles.selectStyle}>
            <span className={styles.required}>*</span>
            {getFieldDecorator('age', {
              rules: [{ required: true, message: '请选择年龄' }]
            })(<Picker
              className = {styles.removeIcon}
              title="请选择年龄"
              extra="请选择年龄"
              data={data}
              cols={cols}
              onPickerChange={_onPickerChange}
              onOk={_onPickerChange}
            >
              <List.Item arrow="horizontal">年龄:</List.Item>
            </Picker>)}           
          </div>
          <div className={styles.selectStyle}>
            <span className={styles.required}>*</span>
            {getFieldDecorator('learnDuration', {
              rules: [{ required: true, message: '请选择英语学习时长' }]
            })(<Picker
              className = {styles.removeIcon}
              title="请选择英语学习时长"
              extra="请选择英语学习时长"
              data={dataTime}
              cols={cols}
              onPickerChange={_onPickerTimeChange}
              onOk={_onPickerTimeChange}
            >
              <List.Item arrow="horizontal">英语学习时长:</List.Item>
            </Picker>)}           
          </div>
        </div>
        <div className={styles.btn}>
          <input
            type="submit"
            className={styles.btnStyle}
            value="确认报名"
            onClick={e => _btnClick(e)}
          />
        </div>
        {/* </form> */}
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ infoMessage }) {
  return { infoMessage };
}

export default connect(mapStateToProps)(createForm()(InfoMessagePage));
