import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import _ from "lodash";
import DocumentTitle from "react-document-title";
import invitationStu from "../../../assets/image/invitationStu.png";
import Sharewx from "../../../components/maketingTools/Sharewx";
import styles from "./InvitationLetterPage.less";

const headImg = "https://oss.pdabc.com/syb/logo.png";

function InvitationLetterPage({ dispatch, invitationletter }) {
  const {
    namespace, // 当前state的namespace
    inventBtn,
    showShare,
    wxShareData,
    stateinventorId,
    stateinventorCnName,
  } = invitationletter;
  let cnName = 
    (window.localStorage &&
      window.localStorage.userInfo &&
      JSON.parse(window.localStorage.userInfo).cnName) ||
    "";
  // let inteorCnName = _.size(window.localStorage)>0 && window.localStorage.inventorCnName;
  let inviteCode =
    window.localStorage &&
    window.localStorage.userInfo &&
    JSON.parse(window.localStorage.userInfo).id;
  const wx = window.wx;
  const linkUrl = encodeURI(`${window.location.origin}/invitationletter?inventorId=${inviteCode}&cnName=${cnName}`);
  // const linkUrl = encodeURIComponent(window.location.origin+`/invitationletter?inventorId=${inviteCode}&cnName=${cnName}`)
  // console.log(inviteCode, "00000", cnName);
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
        title: "给教育行业的你，招一次生，赚两笔钱！好福利，别错过", // 分享标题
        // link:  window.location.href.split('#')[0]+`#/invitationletter?inventorId=${inviteCode}&cnName=${cnName}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        link :linkUrl,
        imgUrl: headImg, // 分享图标
        success() {
          console.log("success");
        }
      });
      wx.onMenuShareAppMessage({
        title: "给教育行业的你，招一次生，赚两笔钱！好福利，别错过", // 分享标题
        desc: "传播好教育，获得高收益，让教育人的收益翻倍", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQQ({
        title: "给教育行业的你，招一次生，赚两笔钱！好福利，别错过", // 分享标题
        desc: "传播好教育，获得高收益，让教育人的收益翻倍", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
      wx.onMenuShareQZone({
        title: "给教育行业的你，招一次生，赚两笔钱！好福利，别错过", // 分享标题
        desc: "传播好教育，获得高收益，让教育人的收益翻倍", // 分享描述
        link :linkUrl,
        imgUrl: headImg // 分享图标
      });
    });
  }
  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _immediatelyAttend() {
    if (inventBtn === "立即邀请") {
      dp(`${namespace}/updateState`, { showShare: true });
    } else if (inventBtn === "立即注册") {
      // console.log('777777',stateinventorId)
      dispatch(
        routerRedux.push({
          // 路由跳转
          pathname: "/login",
          query: { stateinventorId,stateinventorCnName }
        })
      );
    }
  }
  function getStatus() {
    dp(`${namespace}/updateState`, { showShare: false });
  }
  return (
    <DocumentTitle title={`${stateinventorCnName || cnName}邀请函`}>
      <div className={styles.container}>
        {/* <div className={styles.inventName}>{stateinventorCnName || cnName}</div> */}
        <img className={styles.imgStyle} src={invitationStu} alt="" />
        <div className={styles.backEdit}>
          <button className={styles.btnStyle} onClick={_immediatelyAttend}>
            {inventBtn}
          </button>
        </div>
        <Sharewx isShow={showShare} getStatus={flag => getStatus(flag)} />
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ invitationletter }) {
  return { invitationletter };
}

export default connect(mapStateToProps)(InvitationLetterPage);
