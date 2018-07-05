import React, { Component } from "react";
import style from "./Share.less";

/*
 * @param 
 * isShow 组件是否显示
 * url url === sharewx? BtoB : BtoC
 */

class Sharewx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
  }
  handClick() {
    this.setState({ isShow: false }, () => {
      this.props.getStatus && this.props.getStatus(false);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isShow: nextProps.isShow });
  }
  render() {
    return (
      <div>
        {this.state.isShow && (
          <div className={this.props.url==='sharewx'?`${style.share_wrap} ${style.sharewx}`:`${style.share_wrap} ${style.sharewx1}`}>
            <div className={style.btn} onClick={this.handClick.bind(this)} />
          </div>
        )}
      </div>
    );
  }
}
export default Sharewx;
