import React, { Component } from 'react';
import Button from '../Button';
import style from './Success.less';
import wait from '../../../assets/image/wait.png';
import complete from '../../../assets/image/complete.png';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: props.pageType,
      isSubmit: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // if (this.state.pageType === 'wait') {
      window.location.href = '/withdraw';
    // } else {
    //   window.location.href = '/alipay';
    // }
  }

  render() {
    return (
      <div>
        {this.state.pageType === 'wait' && <Wait handleSubmit={this.handleSubmit} />}
        {this.state.pageType === 'complete' && <Complete handleSubmit={this.handleSubmit} />}
      </div>
    );
  }
}
const Wait = props => (
  <div className={style.wrap}>
    <img src={wait} alt="" className={style.wait} />
    <div className={style.title}>等待处理</div>
    <div className={style.text}>预计三天到账，请留意短信</div>
    <Button isSubmit handleSubmit={props.handleSubmit} text="返回收款提现" />
  </div>
);
const Complete = props => (
  <div className={style.wrap}>
    <img src={complete} alt="" className={style.complete} />
    <div className={style.title}>绑定成功</div>
    <Button isSubmit handleSubmit={props.handleSubmit} text="完成" />
  </div>
);

export default Success;
