import React from 'react';
import styles from './SourceManageTable.less';
import TablePagination from '../../../../common/tableComponent/tablePagination/TablePagination';
import { NullData , ProgressBar , BlockHelp } from '../../../../common/commonComponent/CommonComponent';
import { Button , Icon , Input , Form , Popconfirm } from 'antd';
import iconHelp from './IconHelp.json';

function SourceManageTable({
    /*search*/
    fastSearchObj,                          //快捷搜索内容对象
    /*pagination*/
    num,                                    //当前页码
    row,                                    //每页条数
    total,                                  //总共数据条数

    /*table*/
    loading,                                //列表加载状态
    dataSource,                             //项目列表数据

    /*项目编辑*/
    editChoosedItem,                        //编辑下选择中项的属性

    /*方法操作*/
    TableOnChangePage,                      //列表分页改变
    ItemOnAddOrCancel,                      //项目点击添加
    ItemOnEdit,                             //项目点击编辑
    ItemCancelEdit,                         //项目取消编辑
    ItemEditSave,                           //项目编辑保存
    ItemOnDelete,                           //项目点击删除
    form : {
        getFieldDecorator,
        getFieldValue
    }
}){

    let render_data = dataSource && dataSource.map((item,index) => {
        return(
            <div key = { item.id } className = { styles.render_item }>
                <div className = { styles.render_item_content } >
                    { item.type === 1 ? '用户来源渠道' : item.type === 2 ? '销售渠道' : '' }
                </div>
                <div className = { styles.render_item_content }>
                    { editChoosedItem.id === item.id ?
                        <div>
                            { getFieldDecorator('new_name',{
                                initialValue : !!item.name ? item.name + '' : undefined
                            })(
                                <Input placeholder = { item.name } size = 'small' autoFocus onPressEnter = {() => ItemEditSave(item,getFieldValue('new_name'))}/>
                            )}
                            <Icon type = 'save' onClick = {() => ItemEditSave(item,getFieldValue('new_name'))}/>
                            <Icon type = 'close' onClick = { ItemCancelEdit }/>
                        </div> :
                        <div>{ item.name }</div> }
                </div>
                <div className = { styles.render_item_content }>
                    { editChoosedItem.id === item.id ? null : <Icon type = 'edit' onClick = {() => ItemOnEdit(item)}/> }
                    { editChoosedItem.id === item.id ? null :
                        <Popconfirm placement = 'top' title = '确定要删除吗' okText = '是' cancelText = '否' onConfirm = {() => ItemOnDelete(item.id)}>
                            <Icon type = 'delete'/>
                        </Popconfirm>}
                    { editChoosedItem.id === item.id ? <Icon type = 'close' onClick = { ItemCancelEdit }/> : null }
                </div>
            </div>
        )
    });


    return(
        <div className = { styles.sys_manage_all }>
            <div className = { styles.source_title }>
                <div className = { styles.source_title_intro }>
                    <div>设置学员来源</div>
                    <BlockHelp>
                        <div className = { styles.source_title_intro_help }>
                            { iconHelp && iconHelp.map((item,index) => <div key = { index }><Icon type = { item.type }/>{ item.label }</div>) }
                        </div>
                    </BlockHelp>
                </div>
                <div className = 'common_button_group'><Button onClick = { ItemOnAddOrCancel } style = {{ border : '1px solid #999' , background : 'transparent' }}><Icon type = 'plus'/>添加</Button></div>
            </div>
            { !!loading ?
                <ProgressBar/> :
              (!loading && dataSource && dataSource.length === 0) ?
                <NullData/> :
                <div className = { styles.source_content } style = {{ maxHeight : `calc(100vh - 9.6rem - 128px)` }}>
                    { render_data }
                </div>
            }
            <TablePagination num = { num } row = { row } total = { total } showTotal = { `共${total}条渠道信息` } numChange = { TableOnChangePage }/>
        </div>
    )
}

export default Form.create()(SourceManageTable);
