import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';
import { Toast } from 'antd-mobile';
import SetUserName from '../../../components/maketingTools/login/SetUserName';
import bgImg from '../../../assets/image/bgImg.png';
import styles from './LoginPage.less';

function SetUserNamePage({ dispatch, setUserName }) {
  const {
    namespace, // 当前state的namespace
    cnName
  } = setUserName;

  function dp(path, obj) {
    dispatch({ type: path, payload: obj });
  }
  function _previewClick() {
    // 预览
    let previewName = cnName ? cnName :JSON.parse(window.localStorage.getItem('userInfo')).cnName
    // console.log(previewName,'预览')
    dispatch(routerRedux.push({
      // 路由跳转
      pathname: '/preview',
      query: { previewName }
    }));
  }
  function _saveClick(cnName) {
    // 保存
    // console.info(cnName,'登录的用户id')
    if(window.specialTrim(cnName,1).length !== cnName.length ){
      Toast.fail('昵称不能包含空格！')
    }else{
      dp(`${namespace}/_saveClick`, { cnName });
    }
   

   
  }
  function _onBlur(value) {
    // console.log(value,'------------')
    let userInfo  = JSON.parse(window.localStorage.getItem('userInfo'));
    userInfo.cnName = value;
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
    dp(`${namespace}/updateState`, { cnName: value });
  }
  const propsText = {
    _previewClick, // 预览
    _saveClick, // 保存
    _onBlur
  };
  return (
    <DocumentTitle title="设置用户名">
      <div className={styles.container}>
        {/* <NavBar style={{backgroundColor: '#666666'}}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                > 设置用户名</NavBar> */}
        {/* <WingBlank size="sm"> */}
          <div className={styles.bgImgStyle}>
            <img src={bgImg} alt=""/>
          </div>
          <SetUserName {...propsText} />
        {/* </WingBlank> */}
      </div>
    </DocumentTitle>
  );
}

function mapStateToProps({ setUserName }) {
  return { setUserName };
}

export default connect(mapStateToProps)(SetUserNamePage);
