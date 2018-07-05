import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import invitationStu from '../../../assets/image/invitationStu.png';
import styles from './ParticipatePage.less';

function ParticipatePage({ dispatch }) {
  function _immediatelyAttend() {
    dispatch(routerRedux.push({
      // 路由跳转
      pathname: '/login',
      // query: { inviteCode: '0809' }
    }));
  }
  return (
    <div className={styles.container}>
      {/* <NavBar style={{backgroundColor: '#666666'}}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                > 叶超美术邀您体验</NavBar> */}
      <img className={styles.imgStyle} src={invitationStu} alt="" />
      <div className={styles.backEdit}>
        <button className={styles.btnStyle} onClick={_immediatelyAttend}>
          立即注册
        </button>
      </div>
    </div>
  );
}

function mapStateToProps({ participate }) {
  return { participate };
}

export default connect(mapStateToProps)(ParticipatePage);
