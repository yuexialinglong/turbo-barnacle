import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import MineIndex from '../../../components/maketingTools/mineIndex/Mine';
// import headImg from '../../../assets/image/logo.png';
const headImg = 'https://oss.pdabc.com/syb/logo1.png';

class MinePage extends Component {
  constructor(props) {
    super(props);
    this.namespace = this.props.mine.namespace;
    this.dispatch = this.props.dispatch;
    this.userInfo =
      (window.localStorage &&
        window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo)) ||
      {};
    this.state = {
      pageType: this.props.mine.pageType
    };
    this.turnInvited = this.turnInvited.bind(this);
    this.turnRegistration = this.turnRegistration.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.wxShareData = nextProps.mine.wxShareData;
    _.size(this.wxShareData)>0 && this.wxConfigFun();
    // this._getAdmissions(this.userInfo.id);
    // this._getMine(this.userInfo.id);
    // this._getWechatConfig(window.location.href.split('#')[0]);
  }
  componentDidMount(){
    // console.log('---',this.wxShareData)
    this._getAdmissions(this.userInfo.id);
    this._getMine(this.userInfo.id);
    this._getWechatConfig(window.location.href.split('#')[0]);
    // alert(`https://syb.pdabc.com/mine?inventorId=${this.userInfo.id}&cnName=${this.userInfo.cnName}`);
    // this._getWechatConfig(`https://syb.pdabc.com/mine?inventorId=${this.userInfo.id}&cnName=${this.userInfo.cnName}`);
  }
  wxConfigFun() {
    const wx = window.wx;
    const _this = this;
    const linkUrl =encodeURI(`https://syb.pdabc.com/apply?inventorId=${this.userInfo.id}&cnName=${this.userInfo.cnName}`);
    // const linkUrl = encodeURIComponent(window.location.origin+`/apply?inventorId=${this.userInfo.id}`);
    // alert(JSON.stringify(this.wxShareData))
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: (this.wxShareData && this.wxShareData.appId) || '', // 必填，公众号的唯一标识
      timestamp: this.wxShareData && this.wxShareData.timestamp, // 必填，生成签名的时间戳
      nonceStr: this.wxShareData && this.wxShareData.nonceStr, // 必填，生成签名的随机串
      signature: this.wxShareData && this.wxShareData.signature, // 必填，签名
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone'
      ] // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: `${_this.userInfo.cnName}邀请你免费领取4节英美外教课!`, // 分享标题
        // link: `https://syb.pdabc.com/apply?inventorId=${_this.userInfo.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        link:linkUrl,
        imgUrl: headImg, // 分享图标
        success() {
          console.log('success');
        }
      });
      wx.onMenuShareAppMessage({
        title: `${_this.userInfo.cnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: '100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！', // 分享描述
        link:linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQQ({
        title: `${_this.userInfo.cnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: '100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！', // 分享描述
        link:linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQZone({
        title: `${_this.userInfo.cnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: '100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！', // 分享描述
        link:linkUrl,
        imgUrl: headImg // 分享图标
      });
    });
  }
  dp(path, obj) {
    this.props.dispatch({ type: path, payload: obj });
  }
  _getAdmissions(id) {
    this.dp(`${this.namespace}/_getAdmissions`, { id });
  }
  _getMine(id) {
    this.dp(`${this.namespace}/_getMine`, { id });
  }
  _getWechatConfig(url) {
    this.dp(`${this.namespace}/_getWechatConfig`, { url });
  }
  turnRegistration() {
    this.dispatch(routerRedux.push({
      // 路由跳转
      pathname: '/record',
      query: { currentPage: 1 }
    }));
  }
  turnInvited() {
    this.dispatch(routerRedux.push({
      // 路由跳转
      pathname: '/record',
      query: { currentPage: 2 }
    }));
  }

  render() {
    const { mine } = this.props;
    const {
      // 当前state的namespace
      admissionsData,
      mineData
    } = mine;
    const propsObj = {
      admissionsData,
      mineData,
      turnRegistration: this.turnRegistration,
      turnInvited: this.turnInvited
    };
    return (
      <DocumentTitle title="我的招生">
        <div>
          <MineIndex {...propsObj} />
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps({ mine }) {
  return { mine };
}

export default connect(mapStateToProps)(MinePage);
