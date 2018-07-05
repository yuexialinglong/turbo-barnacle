import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import DocumentTitle from 'react-document-title';
import inform from '../../../assets/image/inform.png';

import styles from './MessagePage.less';

function MessagePage({ dispatch, message, form: { getFieldDecorator, validateFields } }) {
  const {
    namespace, // 当前state的namespace
    attendDevice,
    submitBtn
  } = message;

  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _btnClick(e) {
    e.preventDefault();
    // console.log(btnTotal,"点击次数")
    validateFields((error, values) => {
      // dp(`${namespace}/updateState`, { submitBtn: false });
      if (error && Object.keys(error).length > 0) {
        for (const i in error) {
          Toast.fail(error[i].errors[0].message);
          return;
        }
        // dp(`${namespace}/updateState`, {  submitBtn: true, })
      }
      if(!(_.size(attendDevice)>0)){
        Toast.fail('请选择上课设备！')
        // dp(`${namespace}/updateState`, {  submitBtn: true, })
      }else{
        dp(`${namespace}/updateState`, { submitBtn: false });
        dp(`${namespace}/_btnClick`, { values });
      }
    
    });
  }
  function _checkBoxClick() {
    const obj = document.getElementsByName('attendDevice');
    const check_val = [];
    _.forEach(obj, (node) => {
      if (node.checked) {
        check_val.push(node.value);
      }
    });
    // console.log(check_val,'上课设备')
    dp(`${namespace}/updateState`, { attendDevice: check_val });
  }
  const checkoutData = [
    { value: 'iPad', text: 'iPad' },
    { value: 'iPhone', text: 'iPhone' },
    { value: '电脑（带摄像头）', text: '电脑（带摄像头）' },
    { value: '安卓手机(2016年及以后购买)', text: '安卓手机(2016年及以后购买)' }
  ];
  return (
    <DocumentTitle title="完善报名信息">
      <div>
        <div className={styles.informMsg}>
          <img src={inform} alt=""/>
          <div>
             <p>为了给孩子提供更完善的服务,请完善如下信息：</p>
          </div>
          
        </div>
        <div className={styles.messagePage}>
          <div className={styles.phone}>
            <span className={styles.required}>*</span>
            <label>选择上课日期：</label>
            {getFieldDecorator('attendDate', {
              rules: [{ required: true, message: '请选择日期' }]
            })(<select name="date" required>
              <option disabled selected hidden value="">
                  请选择日期
              </option>
              <option value='周一、周四'>周一周四</option>
              <option value='周二、周五'>周二周五</option>
              <option value='周三、周六'>周三周六</option>
               </select>)}
          </div>
          <div className={styles.phone}>
            <span className={styles.required}>*</span>
            <label>选择上课时间：</label>
            {getFieldDecorator('attendTime', {
              rules: [{ required: true, message: '请选择时间' }]
            })(<select name="time" required>
              <option disabled selected hidden value="">
                  请选择时间
              </option>
              <option>19:00-19:25</option>
              <option>19:30-19:55</option>
              <option>20:00-20:25</option>
              <option>20:30-20:55</option>
               </select>)}
          </div>
          <div className={styles.equipmentStyle}>
            <div>
              <span className={styles.required}>*</span>
              <label>上课设备：</label>
            </div>
            <div className={styles.equipList}>
              {_.map(checkoutData, (node, index) => (
                <span key={index} className={styles.equipItem}>
                  <input
                    type="checkbox"
                    value={node.value}
                    onChange={e => _checkBoxClick(e)}
                    name="attendDevice"
                  />
                  {node.text}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.radioStyle}>
            <div>
              <span className={styles.required}>*</span>
              <label>您的孩子英语口语和阅读程度是：</label>
            </div>
            {getFieldDecorator('oralReadLevel', {
              rules: [{ required: true, message: '请选择孩子的英语口语和阅读程度！' }]
            })(<div className={styles.labelStyle}>
              <p>
                <input className={styles.radioInput} type="radio" name="oralReadLevel" value="未接触" />未接触英语
              </p>
              <p>
                <input
                  className={styles.radioInput}
                  type="radio"
                  name="oralReadLevel"
                  value="26个字母"
                />已能认识和念出26个字母
              </p>
              <p>
                <input
                  className={styles.radioInput}
                  type="radio"
                  name="oralReadLevel"
                  value="单词和句子"
                />能看懂及念出基本单词和简短句子。
                <p className={styles.explain}>（如：apple/It's an apple.）</p>
              </p>
              <p>
                <input
                  className={styles.radioInput}
                  type="radio"
                  name="oralReadLevel"
                  value="句型和语法"
                />能看懂并念出完整句型和理解基本语法。
                <p className={styles.explain}>（如：I have two red apples.）</p>
              </p>
               </div>)}
          </div>
          {/* <div className={styles.radioStyle}>
            <div>
              <span className={styles.required}>*</span>
              <label>孩子在校外学习了多久英语：</label>
            </div>
            {getFieldDecorator('outDuration', {
              rules: [{ required: true, message: '请选择孩子在校外学习了多久英语！' }]
            })(<div className={styles.labelStyle}>
              <span>
                <input className={styles.radioInput} type="radio" name="outDuration" value="0" />0
              </span>
              <span>
                <input
                  className={styles.radioInput}
                  type="radio"
                  name="outDuration"
                  value="6-12个月"
                />6-12个月
              </span>
              <span>
                <input
                  className={styles.radioInput}
                  type="radio"
                  name="outDuration"
                  value="一年以上"
                />一年以上
              </span>
               </div>)}
          </div> */}
        </div>
        <div className={styles.btn}>
          <input
            type="submit"
            className={ styles.btnStyle }
            data-bg={ submitBtn ? 'inputUse' : 'inputDis'}
            value={submitBtn ? "提交信息" : "提交信息中..."}
            disabled = {!submitBtn}
            onClick={submitBtn ? (e) => _btnClick(e) : null }
          />
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ message }) {
  return { message };
}

export default connect(mapStateToProps)(createForm()(MessagePage));
