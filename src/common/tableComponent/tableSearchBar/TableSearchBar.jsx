/*
 * 搜索条件区域
 * author zhaojian
 * date 2018.3.20
 * fields array 渲染的搜索条件数组
 * btns array 渲染的按钮数组
 * className object || string 最外层div类名
 * style object 最外层div样式
 * searchObj object 搜索内容对象
 * showDefaultBtn boolean 是否显示默认按钮(重置按钮，默认显示)
 * superFields array 高级搜索内容(只有数组长度大于0，才会显示更多筛选)
 */

import React from 'react';
import moment from 'moment';
import styles from './TableSearchBar.less';
import { Form , Button , Icon , Input , Select , DatePicker , Popover , Dropdown } from 'antd';
//const FormItem = Form.Item;

const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class TableSearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields         : this.props.fields || [],
            superFields    : this.props.superFields || [],
            btns           : this.props.btns || [],
            style          : this.props.style || {},
            searchObj      : this.props.searchObj || {},
            className      : this.props.className || undefined,
            showDefaultBtn : this.props.showDefaultBtn === false ? false : true,
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        this.setState({ ...nextProps });
    }

    //更新输入框的值
    inputUpdateOnChange(e,key){
        let obj = this.state.searchObj || {};
        obj[key] = e.target.value;
        this.setState(obj);
    }

    //查询搜索条件
    pressSearch(e,type,key,format){
        let searchObj = this.state && this.state.searchObj || {};
        if( type === 'input' || type === 'select' || type === 'search' ){
            searchObj[key] = window.jusType('Array',e) ? e.join(',') : e;
        }else if(type === 'datePicker'){
            searchObj[key] = !!e ? moment(e).format(format) : undefined;
        }else if(type === 'rangePicker'){
            searchObj[key.split('-')[0]] = e && e.length === 2 ? moment(e[0]).format(format) : undefined;
            searchObj[key.split('-')[1]] = e && e.length === 2 ? moment(e[1]).format(format) : undefined;
            delete searchObj[key];
        }
        for(let i in searchObj){ if(!searchObj[i]){ delete searchObj[i] } }     //删除搜索条件中为空的元素(后台没有判空处理，唉)
        this.props.onSearch && this.props.onSearch(searchObj);
    }

    //重置搜索条件
    pressCancel(){
        this.props.form && this.props.form.resetFields();
        this.props.onSearch && this.props.onSearch({});
    }

    //渲染查询条件方法(工厂模式方法)
    formatSearchRender(data,style){
        let format_style = style + '_form_item';
        let { getFieldDecorator , getFieldValue } = this.props.form;
        return(
            data && data.map((item,index) => {
                let type = item.type;                                        //控件类型
                let key = item.key;                                          //控件key值 传给后台用
                let label = !!item.label ? item.label + ' :' : '' ;          //控件label名称
                let width = item.width;                                      //控件宽度
                let initialValue = item.initialValue || undefined;           //搜索框初始值
                let placeholder = item.placeholder || '';                    //控件placeholder
                let format = item.format || 'YYYY-MM-DD';                    //针对datePicker 与 rangePicker
                let key_range = item.keyStart + '-' + item.keyEnd;           //key_1与key_2主要针对rangePicker
                let startPlaceholder = item.startPlaceholder || '开始时间';   //针对rangePicker
                let endPlaceholder = item.endPlaceholder || '结束时间';       //针对rangePicker
                let disabledDate = item.disabledDate || undefined;
                let options = item.options || [];                            //针对select
                let opt_key = item.opt_key || 'key';                         //针对select
                let opt_label = item.opt_label || 'label';                   //针对select
                let allowClear = item.allowClear || false;                   //针对select
                let mode = item.mode || undefined;                           //针对select

                /*
                 * 每个return的div中的style定义规则：
                 * style === 'fast',快捷搜索,每个div的lable放在before中,marginRight为5。如果lable有内容,无须处理;如果label没有内容,需要补偿marginLeft为-5
                 * style === 'super',更多筛选,每个div的lable放在before中,marginBottom为3。如果lable有内容,无须处理;如果label没有内容,需要补偿marginTop为-3
                 */
                if( type === 'input' ){
                    return(
                        <div key = { style + '_form_item_' + key } className = { styles[format_style] + ' common_form_item' } data-label = { label } size = 'small' style = { style === 'fast' ? { marginLeft : !!label ? 0 : -5 } : { marginTop : !!label ? 0 : -3 } }>
                            { getFieldDecorator( key, {
                                initialValue : initialValue
                            })(
                                <Input placeholder = { placeholder } style = {{ width : width || 160 }} onPressEnter = {( e ) => this.pressSearch( getFieldValue( key ), type, key )} onChange = {(e) => this.inputUpdateOnChange(e,key)}/>
                            )}
                        </div>
                    )
                } else if( type === 'search' ){
                    return (
                        <div key = { style + '_form_item_' + key } className = { styles[format_style] + ' common_form_item' } data-label = { label }
                        size = 'small' style = { style === 'fast' ? { marginLeft : !!label ? 0 : -5 } : { marginTop : !!label ? 0 : -3 } }>
                            { getFieldDecorator( key, {
                                initialValue : initialValue
                            })(
                                <Search placeholder = { placeholder } style = {{ width : width || 160 }} onSearch = { ( value ) => this.pressSearch( value, type, key ) } onChange = {(e) => this.inputUpdateOnChange(e,key)}></Search>
                            )}
                        </div>
                    )
                } else if( type === 'select' ){
                    return(
                        <div key = { style + '_form_item_' + key } className = { styles[format_style] + ' common_form_item' } data-label = { label } style = { style === 'fast' ? { marginLeft : !!label ? 0 : -5 } : { marginTop : !!label ? 0 : -3 } }>
                            { getFieldDecorator( key, {
                                initialValue : initialValue
                            })(
                                <Select
                                   	size = 'small'
                                    mode = { mode }
                                    allowClear = { allowClear }
                                    showSearch = { true }
                                    optionFilterProp = 'children'
                                    notFoundContent = '未找到'
                                    placeholder = { placeholder }
                                    style = {{ width : width || 160 }}
                                    onChange = {( e ) => this.pressSearch( e, type, key )}
                                >
                                    { !!options && options.map((item, index) =>
                                        <Option key = { 'select_opt_' + index } value = { item[opt_key] + '' } >{ item[opt_label] + '' }</Option>)
                                    }
                                </Select>
                            )}
                        </div>
                    )
                }else if( type === 'datePicker' ){
                    return(
                        <div key = { style + '_form_item' + key } className = { styles[format_style] + ' common_form_item' } data-label = { label } style = { style === 'fast' ? { marginLeft : !!label ? 0 : -5 } : { marginTop : !!label ? 0 : -3 } }>
                            { getFieldDecorator( key, {
                                initialValue : initialValue
                            })(
                                <DatePicker
                                    //allowClear = { allowClear }
                                    size = 'default'
                                    style = {{ width : width || 180 }}
                                    showToday = { false }
                                    allowClear = { false }
                                    format = { format }
                                    placeholder = { placeholder }
                                    onChange = {( e ) => this.pressSearch( e, type, key, format )}
                                />
                            )}
                        </div>
                    )
                }else if(type === 'rangePicker'){
                    return(
                        <div key = { style + '_form_item' + key } className = { styles[format_style] + ' common_form_item' } data-label = { label } style = { style === 'fast' ? { marginLeft : !!label ? 0 : -5 } : { marginTop : !!label ? 0 : -3 } }>
                            { getFieldDecorator(key_range, {
                                initialValue : initialValue
                            })(
                                <RangePicker
                                    //allowClear = { allowClear }
                                    disabledDate = { disabledDate }
                                    size = 'default'
                                    style = {{ width : width || 240 }}
                                    //showTime
                                    allowClear = { false }
                                    format = { format }
                                    placeholder = {[ startPlaceholder, endPlaceholder ]}
                                    onChange = { ( e ) => this.pressSearch( e, type, key_range, format ) }
                                />
                            )}
                        </div>
                    )
                }
            })
        )
    }

    render(){
        let { fields , superFields , btns , className , style , showDefaultBtn } = this.state;

        let formatClassName = !!className ? ' ' + className : '';
        let searchContent = [];         /*搜索内容具体渲染*/
        let superSearchContent = [];    /*高级搜索内容*/
        let btnGroup = [];              /*按钮区域内容渲染*/

        /*快捷搜索内容具体渲染*/
        searchContent = this.formatSearchRender(fields,'fast');

        btnGroup = btns && btns.map((item,index) => {
            return(
                <Button className = { styles.btn_group_item } key = { index } type = { item.type || 'ghost' } onClick = { () => item.handle() }><Icon type = { item.icon }/>{ item.label }</Button>
            )
        })

        if(!!showDefaultBtn){
            btnGroup.push(<Button className = { styles.btn_group_item } key = 'reset' type = 'ghost' onClick = {() => this.pressCancel()}><Icon type = 'reload'/>重置</Button>)
        }

        if(!!superFields && superFields.length > 0){
            /*高级搜索内容具体渲染*/
            superSearchContent = this.formatSearchRender(superFields,'super');
            btnGroup.push(
                <Popover key = 'super_search' placement = 'bottomRight' trigger = 'click' content = { superSearchContent }>
                    <div className = { styles.super_search_enter }><Icon type = 'filter'/>更多筛选</div>
                </Popover>
            )
        }

        return(
            <div className = { styles.all + formatClassName } style = {{ ...style , marginBottom : fields && fields.length > 0 ? 0 : 20 }}>
                { searchContent }
                <div className = { styles.btn_group_wrap }>
                    { btnGroup }
                </div>
            </div>
        )
    }
}

export default Form.create()(TableSearchBar);
