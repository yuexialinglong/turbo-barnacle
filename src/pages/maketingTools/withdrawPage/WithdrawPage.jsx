import React, { Component } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import WithdrawIndex from '../../../components/maketingTools/withdraw/WithdrawIndex';

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.namespace = this.props.mine.namespace;
    this.userInfo = JSON.parse(window.localStorage.userInfo) || {};
    this._getMine(this.userInfo.id);
  }
  componentWillReceiveProps(nextProps) {
    const _userInfo = nextProps.mine.mineData || {};
    // console.log('+++',_userInfo)    
    this.userInfo.balance = _userInfo.balance/100 || 0;
    this.userInfo.totalAmount = _userInfo.totalAmount/100 || 0;
    this.userInfo.confirmAmount = _userInfo.confirmAmount/100 || 0;
    this.userInfo.withdrawAmount = _userInfo.withdrawAmount/100 || 0;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }
  dp(path, obj) {
    this.props.dispatch({ type: path, payload: obj });
  }
  _turnAlipay() {
    this.dp(`${this.namespace}/_turnAlipay`);
  }
  _getMine(id) {
    this.dp(`${this.namespace}/_getMine`, { id });
  }
  render() {
    const { mine } = this.props;
    const {
      // 当前state的namespace
      mineData
    } = mine;
    const propsObj = {
      mineData,
      _turnAlipay: this._turnAlipay.bind(this),
      userInfo: this.userInfo
    };
    return (
      <DocumentTitle title="累计返利">
        <div>
          <WithdrawIndex {...propsObj} />
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps({ mine }) {
  return { mine };
}

export default connect(mapStateToProps)(Withdraw);
