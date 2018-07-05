import React, { Component } from "react";
import { Toast } from "antd-mobile";
import alipay from "../../../assets/image/alipay.png";
import style from "./Withdraw.less";

class WithdrawApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      tele: props.accountNumber,
      username: props.accountName,
      overage: props.balance,
      // overage:0,
      num: "",
      passCode: "",
      time: 59,
      isSubmit: false,
      isApply: false,
      confirm: false,
      text: "获取验证码",
      isOver: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.passCodeFun = this.passCodeFun.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  handleAll() {
    this.setState({
      num: this.state.overage,
      isSubmit: true // 解决点击全部提现，按钮未激活 bug -Young
    });
  }
  handleChange(e) {
    if (Number(e.target.value) === 0)
      this.setState({ num: "", isSubmit: false });
    else {
      this.setState({ num: Number(e.target.value) });
      if (e.target.value <= this.state.overage)
        this.setState({ isSubmit: true, isOver: false });
      else this.setState({ isSubmit: false, isOver: true });
    }
  }
  handleChangePass(e) {
    this.setState({ passCode: e.target.value });
    if (e.target.value) this.setState({ isApply: true });
    else this.setState({ isApply: false });
  }
  handleSubmit() {
    if (this.state.num === 0) return Toast.fail("提现金额必须大于0元");
    this.setState({ confirm: true });
  }
  handleApply() {
    const params = {
      agtId: this.state.id,
      accountNumber: this.state.tele,
      smsCode: this.state.passCode,
      amount: this.state.num * 100
    };
    this.props._withdrawApply(params);
  }
  handleClose() {
    this.setState({ confirm: false });
  }
  passCodeFun(e) {
    if (e.target.innerHTML === "获取验证码") {
      this.props._getVeryCode(this.state.tele);
      this.timer = setInterval(() => {
        if (this.state.time > 0) {
          this.setState({
            text: `${this.state.time}s后重新获取`,
            time: this.state.time - 1
          });
          // console.log(this.state.time);
        } else {
          clearInterval(this.timer);
          this.setState({ text: "获取验证码", time: 59 });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // let button = null;
    // if(this.state.isSubmit) button = <div className={style.submit+' '+style.active} onClick={this.handleSubmit.bind(this)}>提现</div>;
    // else button = <div className={style.submit}>提现</div>;
    return (
      <div className={style.withdraw_wrap}>
        <Alipay tele={this.state.tele} username={this.state.username} />
        <Apply
          overage={this.state.overage}
          num={this.state.num}
          isOver={this.state.isOver}
          handleChange={this.handleChange}
          handleAll={e => this.handleAll(e)}
        />
        <Button
          isSubmit={this.state.isSubmit}
          handleSubmit={this.handleSubmit}
          text="提现"
        />
        {this.state.confirm && (
          <Confirm
            tele={this.state.tele}
            num={this.state.num}
            passCode={this.state.passCode}
            text={this.state.text}
            handleChange={this.handleChangePass}
            handleClose={this.handleClose}
            passCodeFun={this.passCodeFun}
          >
            <Button
              isSubmit={this.state.isApply}
              handleSubmit={this.handleApply}
              text="确认提现"
            />
          </Confirm>
        )}
      </div>
    );
  }
}
const Button = props => {
  let button = null;
  if (props.isSubmit)
    button = (
      <div
        className={`${style.submit} ${style.active}`}
        onClick={props.handleSubmit}
      >
        {props.text}
      </div>
    );
  else button = <div className={style.submit}>{props.text}</div>;
  return button;
};
const Alipay = props => (
  <div className={style.alipay}>
    <img src={alipay} className={style.icon} alt="" />
    <span className={style.name}>{props.username}</span>
    <span className={style.tele}>{props.tele}</span>
  </div>
);
const Apply = props => (
  <div className={style.apply}>
    <div className={style.text} style={{ marginBottom: "20px" }}>
      提现金额
    </div>
    <div className={style.wrap}>
      <div className={style.label}>￥</div>
      <input
        type="number"
        placeholder=""
        value={props.num}
        onChange={props.handleChange}
        maxLength="7"
      />
    </div>
    <div className={style.text}>
      {props.isOver && <div className={style.isOver}>超出可提现余额</div>}
      {!props.isOver && <div>可提现金额 ￥{props.overage}元</div>}
      <div className={style.btn} onClick={() => props.handleAll(props.overage)}>
        全部提现
      </div>
    </div>
  </div>
);

const Confirm = props => (
  <div className={style.confirm_wrap}>
    <div className={style.confirm}>
      <div className={style.close} onClick={props.handleClose} />
      <div className={style.h2}>提现验证</div>
      <div className={style.text}>提现</div>
      <div className={style.wrap}>
        <span className={style.label}>￥</span>
        <span>{props.num}</span>
      </div>
      <ul>
        <li className={style.tele}>{props.tele}</li>
        <li className={style.pass}>
          <input
            type="number"
            value={props.passCode}
            onChange={props.handleChange}
            maxLength={6}
          />
          <div
            className={
              props.text === "获取验证码"
                ? `${style.active} ${style.btn}`
                : style.btn
            }
            onClick={props.passCodeFun}
          >
            {props.text}
          </div>
        </li>
      </ul>
      {props.children}
    </div>
  </div>
);

export default WithdrawApply;
