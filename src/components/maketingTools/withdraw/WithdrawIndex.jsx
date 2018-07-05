import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import btnWithdraw from '../../../assets/image/btn_withdraw.png';
import alipay from '../../../assets/image/alipay.png';
import enter from '../../../assets/image/enter.png';
import style from './Withdraw.less';

class WithdrawIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineData: {}
    };
    this.turnAlipay = props._turnAlipay;
    // console.log(props);
  }
  handleClick(e) {
    if (this.props.userInfo.accountNumber) window.location.href = e;
    else {
      Toast.fail('请绑定支付宝后再提现');
      setTimeout(() => {
        window.location.href = '/bindAlipay';
      }, 3000);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    return (
      <div className={style.withdraw_wrap}>
        <Overage data={this.state.mineData} handleClick={e => this.handleClick(e)} />
        <Detail data={this.state.mineData} />
        <Alipay handleClick={this.turnAlipay} />
        <a className={style.home} href={'/mine'}>返回首页</a>
      </div>
    );
  }
}

const Overage = props => (
  <div className={style.overage}>
    <div className={style.text}>账户余额</div>
    <div className={style.number_wrap}>
      <span>￥</span>
      <span className={style.number}>{props.data.balance / 100 || 0}.00</span>
    </div>
    <div className={style.btn_withdraw} onClick={() => props.handleClick('/withDrawApply')}>
      <img src={btnWithdraw} alt="" />
      <div>提现</div>
    </div>
  </div>
);
const Detail = props => (
  <div className={style.detail}>
    <ul>
      <li>
        <div className={style.number}>￥{props.data.totalAmount / 100 || 0}.00</div>
        <div className={style.label}>累计返利</div>
      </li>
      <li>
        <div className={style.number}>￥{props.data.confirmAmount / 100 || 0}.00</div>
        <div className={style.label}>确认返利</div>
      </li>
      <li style={{ borderRight: 'none' }}>
        <div className={style.number}>￥{props.data.withdrawAmount / 100 || 0}.00</div>
        <div className={style.label}>提现总额</div>
      </li>
    </ul>
  </div>
);
const Alipay = props => (
  <div className={style.alipay} onClick={props.handleClick}>
    <img src={alipay} className={style.icon} alt="" />
    <span className={style.index}>支付宝</span>
    <img src={enter} className={style.enter} alt="" />
  </div>
);

export default WithdrawIndex;
