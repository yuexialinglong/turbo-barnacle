import React, { Component } from 'react';
import Button from '../Button';
import style from './Alipay.less';

class Alipay extends Component {
  constructor(props) {
    super(props);
    const userInfo = JSON.parse(window.localStorage.userInfo) || {};
    this.state = {
      acount: { accountName: userInfo.accountName, accountNumber: userInfo.accountNumber },
      isSubmit: true
    };
  }
  handleSubmit() {
    window.location.href = '/bindAlipay';
  }

  render() {
    return (
      <div className={style.wrap}>
        {this.state.acount.accountName && (
          <div>
            <div className={style.card}>
              <div className={style.name}>姓名：{this.state.acount.accountName}</div>
              <div className={style.acount}>账号：{this.state.acount.accountNumber}</div>
            </div>
            <Button
              isSubmit={this.state.isSubmit}
              handleSubmit={this.handleSubmit}
              text="更换支付宝"
            />
          </div>
        )}
        {!this.state.acount.accountName && (
          <div className={style.card} onClick={this.handleSubmit}>
            <div className={`${style.add} ${style.icon}`} />
            <div className={style.add}>添加账号</div>
          </div>
        )}
      </div>
    );
  }
}

export default Alipay;
