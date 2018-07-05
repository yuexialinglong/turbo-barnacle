import React, { Component } from "react";
import moment from 'moment';
import style from "./Mine.less";
import Sharewx from "../Sharewx";
import newApplication from "../../../assets/image/newApplication1.png";
// import numberPeople from "../../../assets/image/numberPeople1.png";
import share from "../../../assets/image/share1.png";
import more from "../../../assets/image/more.png";
import seal from "../../../assets/image/seal.png";
import setting from "../../../assets/image/setting.png";
import invent from "../../../assets/image/invent.png";
import enter from "../../../assets/image/enter.png";
import enterRed from "../../../assets/image/enter-red.png";
moment.locale('zh-cn');

class MineIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: "admissions",
      admissionsData: {},
      mineData: {},
      showShare: false
    };
    this.userInfo = JSON.parse(localStorage.userInfo) || {};
    // this.handleShare = this.handleShare.bind(this);
  }
  handleClick(type) {
    this.setState({ pageType: type });
  }
  handleShare() {
    this.setState({ showShare: true });
  }
  getStatus() {
    this.setState({ showShare: false });
  }
  componentWillReceiveProps(nextProps){
    // alert(JSON.stringify(nextProps.admissionsData))
    this.setState(nextProps)
  }

  render() {
    return (
      <div className={style.wrap}>
        {this.state.pageType === "admissions" && (
          <Admissions
            data={this.state.admissionsData}
            turnRegistration={this.props.turnRegistration}
            handleShare={() => this.handleShare()}
          />
        )}
        {this.state.pageType === "mine" && (
          <Mine
            data={this.state.mineData}
            turnRegistration={this.props.turnRegistration}
            turnInvited={this.props.turnInvited}
            inventorId={this.userInfo.id}
          />
        )}
        <Tab
          pageType={this.state.pageType}
          handleClick={e => this.handleClick(e)}
        />
        <Sharewx
          isShow={this.state.showShare}
          getStatus={flag => this.getStatus(flag)}
          url='sharewx'
        />
      </div>
    );
  }
}
const Admissions = props => {
  // let {total,increment,finished} = props.data;
  const data = props.data || {};
  const latestList = data.latestList || [];
  const total = data.total || "";
  const increment = data.increment || "";
  const finished = data.finished || "";
  const item = latestList.map((element, index) => {
    const el = JSON.parse(element);
    return (
      <Item key={index} name={el.stuName} age={el.age} date={el.createTime} />
    );
  });
  return (
    <div>
      <div className={style.section}>
        <div className={style.sectionTitle}>
          {/* <Title img={`${numberPeople}`} text="报名学员人数" /> */}
          <Title
            img={`${share}`}
            text="邀请学员"
            style={{ float: "right" }}
            handleShare={props.handleShare}
          />
        </div>
        <div className={style.number}>{total || 0}</div>
        <div>
          <div className={style.text} style={{ borderRight: "1px solid #eee" }}>
            今日新增 {increment || 0}人
          </div>
          <div className={style.text}>完成人数 {finished || 0}人</div>
        </div>
      </div>
      <div className={style.section}>
        <div>
          <div className={style.more} onClick={props.turnRegistration}>
            <span>更多</span>
            <img src={more} alt="" />
          </div>
          <Title img={`${newApplication}`} text="最新报名" />
        </div>
        <div className={style.item_wrap}>{item}</div>
      </div>
    </div>
  );
};
const Mine = props => {
  const { totalAmount, 
    inviteAmount, 
    enrollAmount 
  } = props.data;
  return (
    <div>
      <div className={style.section}>
        <img src={seal} alt="" className={style.seal} />
        <div className={style.money}>
          <span>￥</span>
          {totalAmount / 100 || 0}.00
        </div>
        <a className={style.record} href="/withDraw">
          累计返利 <img src={enterRed} alt=""/>
        </a>
      </div>
      <div className={style.section} style={{ paddingBottom: "0",paddingTop:'0'}}>
        <div className={style.column}>
          <div
            style={{ borderRight: "1px solid #eee" }}
            className={style.type}
            onClick={props.turnRegistration}
          >
            <div className={style.num}>￥{enrollAmount / 100 || 0}.00</div>
            <div className={style.tit}>报名返利</div>
          </div>
          <div className={style.type} onClick={props.turnInvited}>
            <div className={style.num}>￥{inviteAmount / 100 || 0}.00</div>
            <div className={style.tit}>邀请返利</div>
          </div>
        </div>
        <a className={style.column} href="https://syb.pdabc.com/invitationletter">
          <Title
            img={`${invent}`}
            text="邀请同伴获得更多返利"
            rightImg={enter}
          />
        </a>
        <a
          className={style.column}
          href="/setUserName"
          style={{ borderBottom: "none" }}
        >
          <Title img={`${setting}`} text="设置" rightImg={enter} />
        </a>
      </div>
    </div>
  );
};
class Tab extends Component {
  render() {
    return (
      <div className={style.tab_wrap}>
        <div
          className={
            this.props.pageType === "admissions"
              ? `${style.tab} ${style.admissions} ${style.active}`
              : `${style.tab} ${style.admissions}`
          }
          onClick={(type, e) => this.props.handleClick("admissions", e)}
        >
          <div className={style.img} />
          <div className={style.tabtitle}>招生</div>
        </div>
        <div
          className={
            this.props.pageType === "mine"
              ? `${style.tab} ${style.mine} ${style.active}`
              : `${style.tab} ${style.mine}`
          }
          onClick={(type, e) => this.props.handleClick("mine", e)}
        >
          <div className={style.img} />
          <div className={style.tabtitle}>我的</div>
        </div>
      </div>
    );
  }
}
const Title = props => (
  <div className={style.title} style={props.style}>
    <div className={style.titleLeft} onClick={props.handleShare}>
      <img src={props.img} alt="" className={style.logo} />
      <span>{props.text}</span>
    </div>
    <img src={props.rightImg} alt="" className={style.arrow} />
  </div>
);
const Item = props => (
  <div className={style.item}>
    <div className={style.name}>{props.name}</div>
    <div className={style.age}>{props.age}</div>
    <div className={style.date}>{moment(props.date).format('MMMDo HH:mm')}</div>
  </div>
);

export default MineIndex;
