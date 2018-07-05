/*
 * 倒计时获取验证码
 * author zhaojian
 * date 2018/5/16
 * nowTime number 当前倒计时显示时间
 * startCount boolean 是否开始计时
 * timeoutFn function 计时定时器函数
 *
 * startCount function 开始计时回调(外部传入)
 * endCount function 结束计时回调函数(外部传入)
 */

import React from 'react';
import styles from '../CommonComponentLess/GetVerCode.less';

class GetVerCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowTime: undefined,
      startCount: false,
      timeoutFn: undefined
    };
  }

  componentWillUnmount() {
    // 清空state中的定时函数最好还是clearTimeout(this.state.xxx)
    if (this.state.timeoutFn) {
      clearTimeout(this.state.timeoutFn);
    }
  }

  startCountTime(time) {
    let flag = this.props.startCountFn && this.props.startCountFn() === false ? false : true;
    if (flag) {
      this.setState({ startCount: true }, () => {
        this.countTime(time);
      });
    }
    // //更新状态完成再进行计时函数，保证同步性
    // this.setState({ startCount : true }, () => {
    //     let flag = this.props.startCountFn && this.props.startCountFn();
    //     if(flag){
    //         this.countTime(time);
    //     }
    // });
  }

  countTime(nowTime) {
    if (nowTime > 0) {
      nowTime -= 1;
      this.setState({
        nowTime,
        timeoutFn: setTimeout(() => this.countTime(nowTime), 1000)
      });
    } else {
      // 清空state中的定时函数最好还是clearTimeout(this.state.xxx)
      if (this.state.timeoutFn) {
        clearTimeout(this.state.timeoutFn);
      }
      this.setState({ timeoutFn: undefined, startCount: false });
      this.props.endCountFn && this.props.endCountFn();
    }
  }

  render() {
    const { nowTime, startCount } = this.state;
    const time = !isNaN(`${this.props.time}`) && this.props.time > 0 ? this.props.time : 30;
    return (
      <div>
        {!startCount ? (
          <button
            className={styles.codeStyle}
            type="primary"
            onClick={() => this.startCountTime(time)}
          >
            获取验证码
          </button>
        ) : (
          <button
            className={styles.codeNowTimeStyle}
            type="ghost"
            disabled
            onClick={() => this.countTime(time)}
          >
            {`${nowTime}s后重新获取`}
          </button>
        )}
      </div>
    );
  }
}

export default GetVerCode;
