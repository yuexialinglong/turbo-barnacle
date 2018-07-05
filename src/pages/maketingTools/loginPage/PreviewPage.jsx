import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import _ from 'lodash'
import DocumentTitle from 'react-document-title';
import invitation from '../../../assets/image/invitation.jpg';
import styles from './PreviewPage.less';

function PreviewPage({ dispatch, preview }) {
  const { cnName } = preview;

  function _backEdit() {
    if(_.size(window.sessionStorage.inventorId)){
      dispatch(routerRedux.push({
        // 路由跳转
        pathname: '/setUserName',query:window.sessionStorage.inventorId
      }));
    }else{
      dispatch(routerRedux.push({
        // 路由跳转
        pathname: '/setUserName'
      }));
    }
    
  }
  return (
    <DocumentTitle title={`${cnName}邀您体验`}>
      <div className={styles.container}>
        {/* <NavBar style={{backgroundColor: '#666666'}}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                > 叶超美术邀您体验</NavBar> */}
        <img className={styles.imgStyle} src={invitation} alt="" />
        <div className={styles.backEdit}>
          <button className={styles.btnStyle} onClick={_backEdit}>
            返回编辑
          </button>
        </div>
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ preview }) {
  return { preview };
}

export default connect(mapStateToProps)(PreviewPage);
