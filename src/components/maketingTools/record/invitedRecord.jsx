import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { createForm } from 'rc-form';
import finshed from '../../../assets/image/finshed.png';
import unfinshed from '../../../assets/image/unfinshed.png';
import styles from './RegistrationRecord.less';

function InvitedRecord({ data }) {
  // console.log(data,'===========')
  return (
    <div className={styles.container}>
      <div className={styles.totalStyle}>
        <span>合计：{_.size(data)>0 ? `￥${data.totalAmount/100 || 0}` : '0'}</span>
        <span>已完成：{_.size(data)>0 ? `￥ ${data.confirmAmount/100 || 0}` : '0'}</span>
      </div>
      {_.map(data ? data.userAgts : {}, (node, index) => {
        if (node.confirmStuCnt >= 10) {
          return (
            <div key={index} className={styles.listData}>
              <div>
                <img src={finshed} alt="" />
              </div>
              <div className={styles.infomsg}>
                <div>
                  <span>{`${node.cnName}`}</span>
                  <span className={styles.finshedMoney}>{`￥${node.perInviteAmount / 100}`}</span>
                </div>
                <div>
                  <span className={styles.unfinshedState}>
                    {`招生：${node.stuCnt}  已确认：${node.confirmStuCnt}`}
                  </span>
                  <span className={styles.timeStyle}>
                    {moment(node.createTime).format('YYYY.MM.DD  HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.listData}>
              <div>
                <img src={unfinshed} alt="" />
              </div>
              <div className={styles.infomsg}>
                <div>
                  <span>{`${node.cnName}`}</span>
                  <span>{`￥${node.perInviteAmount / 100}`}</span>
                </div>
                <div>
                  <span className={styles.unfinshedState}>
                    {`招生：${node.stuCnt}   已确认：${node.confirmStuCnt}`}
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
    </div>
  );
}
export default createForm()(InvitedRecord);