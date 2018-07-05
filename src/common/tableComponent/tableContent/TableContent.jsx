/*
 * table组件封装
 * author zhaojian
 * date 2018/3/20
 * userId string 当前登录用户的id,用来定义存入列表头部显隐的唯一判断,用来处理一台电脑多个用户登录权限分离的情况
 * namespace string 唯一的列表值(一般取state中的namespace来保持唯一性)
 * className string/object 自定义类名
 * style object 自定义样式
 * columns array 渲染的列表头部
 * loading boolean 列表加载状态
 * xScroll number/string 出现X滚动条临界宽度
 * yScroll number/string 出现y滚动条临界高度
 * rowKey string 列表项主键
 * initSelectColumns array 强制显示不可消失的列表项数组
 * initColumns array componentDidMount时由columns复制而来,用来渲染头部下拉选择框内容(之后任何操作时只会修改columns不会修改initColumns)
 * columnKeys array 当前显示的columns数组的key数组
 */

import React from 'react';
import { Table, Dropdown, Checkbox } from 'antd';
import { NullData, ProgressBar } from '../../commonComponent/CommonComponent';
import styles from './TableContent.less';

const CheckboxGroup = Checkbox.Group;

class TableContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      namespace: this.props.namespace || '',
      namespaceSuffix: '_table_title_select',
      className: this.props.className || '',
      style: this.props.style || {},
      columns: this.props.columns || [],
      loading: this.props.loading || false,
      dataSource: this.props.dataSource || [],
      rowSelection: this.props.rowSelection || undefined,
      xScroll: this.props.xScroll || 800,
      yScroll: this.props.yScroll || undefined,
      rowKey: this.props.rowKey || 'id',
      initSelectColumns: this.props.initSelectColumns || [],
      initColumns: [],
      columnKeys: []
    };
  }

  componentDidMount() {
    const { initSelectColumns, columns } = this.state;
    this.setState({
      userId: JSON.parse(window.localStorage.userInfo).id,
      initColumns: columns
    });
    // 只有在需要显示行的时候进行列格式化
    initSelectColumns &&
      initSelectColumns.length > 0 &&
      this.updateColumns(columns, initSelectColumns);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    // 只有在需要显示行的时候进行列格式化
    nextProps &&
      nextProps.initSelectColumns &&
      nextProps.initSelectColumns.length > 0 &&
      this.updateColumns(nextProps.columns, nextProps.initSelectColumns);
  }

  arrayGetSame(a, b) {
    const sameArr = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (a[i] == b[j]) {
          sameArr.push(a[i]);
          break;
        }
      }
    }
    return sameArr;
  }

  // 更新列操作
  updateColumns(columns, initSelectColumns) {
    const columnKeys = [];
    const newColumns = [];
    const { userId, namespace, namespaceSuffix } = this.state;
    if (!!window.localStorage && !!window.localStorage[namespace + namespaceSuffix + userId]) {
      // 已经赋值到localStorage中，则从localStorage中取出该值进行列表渲染
      const localColumnKeys = JSON.parse(window.localStorage[namespace + namespaceSuffix + userId])
        .showColumns;
      // 定义columns中的key数组
      const initColumnKeys = [];
      // 定义columns数组和localColumnKeys数组中的交集
      let SameArr = [];
      // 检查默认显示的列是否在要显示的列中，如果没有，则push进去
      for (let i = 0; i < initSelectColumns.length; i++) {
        if (localColumnKeys.indexOf(initSelectColumns[i]) == -1) {
          localColumnKeys.push(initSelectColumns[i]);
        }
      }
      // 从全部列中找出需要展示的列
      for (let i = 0; i < columns.length; i++) {
        if (
          localColumnKeys.indexOf(columns[i].key) > -1 ||
          localColumnKeys.indexOf(`${columns[i].key}`) > -1
        ) {
          newColumns.push(columns[i]);
        }
        initColumnKeys.push(columns[i].key);
      }
      SameArr = this.arrayGetSame(localColumnKeys, initColumnKeys);
      this.setState({ columnKeys: SameArr, columns: newColumns, initColumns: columns });
      // 更新本地缓存中的showColumns
      window.localStorage.setItem(
        namespace + namespaceSuffix + userId,
        JSON.stringify({ showColumns: SameArr, userId })
      );
    } else {
      // 没有赋值进入localStorage中，则全选
      for (let i = 0; i < columns.length; i++) {
        columnKeys.push(columns[i].key);
      }
      this.setState({ columnKeys, initColumns: columns });
    }
  }

  // 手动更新列的操作
  columnOnChange(e) {
    const newColumns = [];
    const {
      userId, namespace, namespaceSuffix, initColumns, columnKeys
    } = this.state;
    for (let i = 0; i < initColumns.length; i++) {
      if (e.indexOf(initColumns[i].key) > -1 || e.indexOf(`${initColumns[i].key}`) > -1) {
        newColumns.push(initColumns[i]);
      }
    }
    this.setState({ columns: newColumns, columnKeys: e });
    if (window.localStorage) {
      // 将显示数组加入localStorage中，加入userId以便于一台电脑多个账户登录分开进行保存
      window.localStorage.setItem(
        namespace + namespaceSuffix + userId,
        JSON.stringify({ showColumns: e, userId })
      );
    }
  }

  render() {
    const {
      className,
      style,
      columns,
      loading,
      dataSource,
      rowSelection,
      xScroll,
      yScroll,
      rowKey,
      initSelectColumns,
      initColumns,
      columnKeys
    } = this.state;
    const formatClassName = className ? ` ${className}` : '';
    const checkbox = (
      <CheckboxGroup
        className="common_table_set_item_check_box"
        onChange={e => this.columnOnChange(e)}
        value={columnKeys}
      >
        {initColumns &&
          initColumns.map((item, index) => (
            <Checkbox
              key={`columnKeys_${item.key}`}
              value={item.key}
              disabled={initSelectColumns.indexOf(item.key) !== -1}
            >
              {item.title}
            </Checkbox>
            ))}
      </CheckboxGroup>
    );
    const selectColumnsFlag = !!initSelectColumns && initSelectColumns.length > 0; // 是否有表头选择判断条件
    const defaultYScroll = selectColumnsFlag
      ? 'calc( 100vh - 9.6rem - 168px )'
      : 'calc( 100vh - 9.6rem - 128px )';
    return (
      <div className={`common_table${formatClassName}`} style={style || {}}>
        {selectColumnsFlag ? (
          <Dropdown overlay={checkbox} trigger={['click']}>
            <div className={styles.free_columns}>
              <a>自定义表头字段</a>
              （<span>
                {`${(columnKeys && columnKeys.length) || 0
                  }/${
                  (initColumns && initColumns.length) || 0}`}
              </span>）
            </div>
          </Dropdown>
        ) : null}
        <Table
          bordered
          columns={columns || []}
          pagination={false}
          dataSource={loading ? [] : dataSource || []}
          scroll={{
            x: selectColumnsFlag ? window.calcWidth(columns) : xScroll,
            y: yScroll || defaultYScroll
          }}
          rowSelection={rowSelection || undefined}
          locale={{ emptyText: loading ? <ProgressBar /> : <NullData /> }}
          rowKey={rowKey || 'id'}
        />
        <div className={styles.common_table_flag} style={{ top: selectColumnsFlag ? 40 : 0 }} />
      </div>
    );
  }
}

export default TableContent;
