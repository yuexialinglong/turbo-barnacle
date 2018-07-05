import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import _ from 'lodash';
import DocumentTitle from "react-document-title";
import invitation from "../../../assets/image/invitation.jpg";
import styles from "./ApplyPage.less";

const headImg = "https://oss.pdabc.com/syb/logo1.png";

function ApplyPage({ dispatch, apply }) {
  let { applyInventorId, applyCnName ,wxShareData } = apply;
  function _applyClick() {
    dispatch(
      routerRedux.push({
        // 路由跳转
        pathname: "/infoMessage",
        query: { applyInventorId,applyCnName }
      })
    );
  }
  const wx = window.wx;
  const linkUrl = `${window.location.href}`;
  _.size(wxShareData) > 0 && wxConfigFun();
  function wxConfigFun() {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: (wxShareData && wxShareData.appId) || "", // 必填，公众号的唯一标识
      timestamp: wxShareData && wxShareData.timestamp, // 必填，生成签名的时间戳
      nonceStr: wxShareData && wxShareData.nonceStr, // 必填，生成签名的随机串
      signature: wxShareData && wxShareData.signature, // 必填，签名
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareQZone"
      ] // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: `${applyCnName}邀请你免费领取4节英美外教课!`, // 分享标题
        link :linkUrl,
        imgUrl: headImg, // 分享图标
        success() {
          console.log("success");
        }
      });
      wx.onMenuShareAppMessage({
        title: `${applyCnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: "100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQQ({
        title: `${applyCnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: "100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQZone({
        title: `${applyCnName}邀请你免费领取4节英美外教课!`, // 分享标题
        desc: "100%纯正美英外教，4-12岁孩子最喜欢的外教课！选择上课时间进行领取！", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
    });
  }
  return (
    <DocumentTitle title={`${applyCnName}邀您体验`}>
      <div className={styles.container}>
        <img className={styles.imgStyle} src={invitation} alt="" />
        <div className={styles.backEdit}>
          <button className={styles.btnStyle} onClick={_applyClick}>
            立即报名
          </button>
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ apply }) {
  return { apply };
}

export default connect(mapStateToProps)(ApplyPage);
