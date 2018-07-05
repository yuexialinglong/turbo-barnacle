import React, { Component } from 'react';
import Button from '../Button';
import { Checkbox, Toast } from 'antd-mobile';
import style from './BindAlipay.less';

class BindAlipay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.accountName,
      tele: window.turnTele(props.accountNumber),
      acount: props.accountNumber,
      passCode: '',
      isSubmit: false,
      isChecked: true,
      time: 59,
      text: '获取验证码',
      id: ''
    };
    // console.log(props.accountNumber)
    this.getVeryCode = props._getVeryCode;
    this.bindAlipay = props._bindAlipay;
    this.handleCheck = this.handleCheck.bind(this);
    // this.setUserInfo();
  }
  componentDidMount(){
    if(sessionStorage.userParams){
      let para = JSON.parse(sessionStorage.getItem('userParams'));
      this.setState(para)
    }
  }
  handleChange(type, event) {
    switch (type) {
      case 'name':
        this.setState({ name: event.value });
        break;
      case 'acount':
        this.setState({ acount: event.value });
        break;
      case 'passcode':
        this.setState({ passCode: event.value });
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.checkActiveFun();
    }, 100);
  }
  setSessionFun(){
    sessionStorage.clear();
    let userParams = {
      name:this.state.name,
      acount:this.state.acount,
      tele:this.state.tele
    }
    sessionStorage.setItem('userParams',JSON.stringify(userParams));
    window.location.href = '/rules';
  }
  checkActiveFun() {
    const bool =
      Boolean(this.state.name) &&
      Boolean(this.state.acount) &&
      Boolean(this.state.tele) &&
      Boolean(this.state.passCode) &&
      Boolean(this.state.isChecked);
    if (bool) this.setState({ isSubmit: true });
    else this.setState({ isSubmit: false });
  }
  checkPhoneFun() {
    const reg = /^1[0-9]{10}$/;
    let bool = false;
    if (reg.test(this.state.acount)) bool = true;
    return bool;
  }
  handleCheck(e) {
    if (e.target.checked) this.setState({ isChecked: true });
    else this.setState({ isChecked: false });
    setTimeout(() => {
      this.checkActiveFun();
    }, 100);
  }
  handleBlur() {
    if (this.checkPhoneFun()) {
      // const str = `${this.state.acount}`;
      // const arr = str.split('');
      // arr.splice(3, 4, '*', '*', '*', '*');
      // const num = arr.join('');
      let num = window.turnTele(this.state.acount);
      this.setState({ tele: num });
    } else {
      Toast.fail('请输入正确的手机号码');
      this.setState({ tele: '' });
    }
  }
  handleSubmit() {
    const params = {
      accountName: this.state.name,
      accountNumber: this.state.acount,
      phone: this.state.acount,
      smsCode: this.state.passCode,
      id: this.state.id
    };
    // console.log('---',params)
    this.bindAlipay(params);
    // window.location.href = '/success'
  }
  passCodeFun(e) {
    if (e.target.innerHTML === '获取验证码') {
      if (this.checkPhoneFun()) {
        this.getVeryCode(this.state.acount);
        this.timer = setInterval(() => {
          if (this.state.time > 0) {
            this.setState({ text: `${this.state.time}s后重新获取`, time: this.state.time - 1 });
          } else {
            clearInterval(this.timer);
            this.setState({ text: '获取验证码', time: 59 });
          }
        }, 1000);
      } else Toast.fail('请输入正确的手机号码');
    }
  }
  componentWillMount() {
    const userInfo = JSON.parse(window.localStorage.userInfo) || {};
    this.setState({
      name: userInfo.accountName,
      tele: window.turnTele(userInfo.accountNumber),
      acount: userInfo.accountNumber,
      id: userInfo.id
    });
  }

  render() {
    return (
      <div className={style.wrap}>
        <div className={style.title}>请填写支付宝账号信息</div>
        <div className={style.section}>
          <Input
            label="姓名"
            max={6}
            value={this.state.name}
            handleChange={e => this.handleChange('name', e)}
            placeholder="请输入姓名"
          />
          <Input
            label="账号"
            max={11}
            value={this.state.acount}
            handleChange={e => this.handleChange('acount', e)}
            placeholder="请输入支付宝账号"
            handleBlur={this.handleBlur.bind(this)}
          />
        </div>
        <div className={style.section}>
          <div className={style.input_wrap}>
            <div className={style.label}>手机号</div>
            <div className={style.input}>{this.state.tele}</div>
          </div>
          <Input
            label="验证码"
            max={6}
            value={this.state.passCode}
            handleChange={e => this.handleChange('passcode', e)}
            placeholder="请输入验证码"
          >
            <div
              className={
                this.state.text === '获取验证码' ? `${style.active} ${style.btn}` : style.btn
              }
              onClick={e => this.passCodeFun(e)}
            >
              {this.state.text}
            </div>
          </Input>
        </div>
        <Checkbox className={style.checkbox} onChange={this.handleCheck} defaultChecked />
        <span className={style.rule}>
          同意<div onClick={this.setSessionFun.bind(this)}>《服务协议》</div>
        </span>
        <Button
          isSubmit={this.state.isSubmit}
          handleSubmit={e => this.handleSubmit(e)}
          text="下一步"
        />
      </div>
    );
  }
}
class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange() {
    this.props.handleChange(this.input);
  }
  handleBlur() {
    this.props.handleBlur && this.props.handleBlur();
  }
  render() {
    return (
      <div className={style.input_wrap}>
        <div className={style.label}>{this.props.label}</div>
        <input
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
          maxLength={this.props.max}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          ref={dom => (this.input = dom)}
        />
        {this.props.children}
      </div>
    );
  }
}

export default BindAlipay;
