import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { createForm } from 'rc-form';
// import {PullToRefresh} from 'antd-mobile';
import finshed from '../../../assets/image/finshed.png';
import unfinshed from '../../../assets/image/unfinshed.png';
import styles from './RegistrationRecord.less';

function RegistrationRecord({ data }) {
  // console.log(data,'000000000000')
  return (
    <div className={styles.container}>
      <div className={styles.totalStyle}>
        <span>合计：{_.size(data)>0 ? `￥${data.totalAmount/100}` : '0'}</span>
        <span>已完成：{_.size(data)>0 ? `￥ ${data.confirmAmount/100}` : '0'}</span>
      </div>
      {/* <PullToRefresh 
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}> */}
        {_.map(data ? data.attachInfos : {}, (node, index) => {
          if (JSON.parse(node.attach).status === 0) {
            return (
              <div key={index} className={styles.listData}>
                <div>
                  <img src={unfinshed} alt=""/>
                </div>
                <div className={styles.infomsg}>
                  <div>
                    <span>
                      {`${JSON.parse(node.attach).stuName}  ${JSON.parse(node.attach).age}`}
                    </span>
                    <span>{`￥${node.perEnrollAmount / 100}`}</span>
                  </div>
                  <div>
                    <span className={styles.unfinshedState}>
                      {`${JSON.parse(node.attach).status === 0 ? '等待排课' : '已确定'}(${
                        JSON.parse(node.attach).attendDate
                      })`}
                    </span>
                    <span className={styles.timeStyle}>
                      {moment(node.createTime).format('YYYY.MM.DD  HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
            );
          } else if (JSON.parse(node.attach).status === 1) {
            return (
              <div key={index} className={styles.listData}>
                <div>
                  <img src={finshed} alt=""/>
                </div>
                <div className={styles.infomsg}>
                  <div>
                    <span>
                      {`${JSON.parse(node.attach).stuName}  ${JSON.parse(node.attach).age}`}
                    </span>
                    <span className={styles.finshedMoney}>{`￥${node.perEnrollAmount / 100}`}</span>
                  </div>
                  <div>
                    <span>
                      {`${JSON.parse(node.attach).status === 0 ? '等待排课' : '已确定'}(${
                        JSON.parse(node.attach).attendDate
                      })`}
                    </span>
                    <span className={styles.timeStyle}>
                      {moment(node.createTime).format('YYYY.MM.DD  HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      {/* </PullToRefresh> */}
    </div>
  );
}
export default createForm()(RegistrationRecord);
