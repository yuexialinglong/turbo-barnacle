import React from 'react';
import { Modal , Button , Form , Spin , Input , Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol : { span : 5 },
    wrapperCol : { span : 19 }
}

//系统设置 -> 账户新增编辑课程信息
function CourseAddOrEditModal({
    /*部门数据*/
    departData,                             //部门信息数据

    /*账户新增编辑modal*/
    accountAddOrEditModalType,              //modal类型(add/edit)
    accountAddOrEditModalVisible,           //modal是否显示
    accountAddOrEditModalLoading,           //modal加载状态
    accountAddOrEditModalButtonLoading ,    //modal按钮加载状态
    accountAddOrEditModalData,              //编辑时回填数据

    AddOrEditAccountSubmit,                 //账户操作表单提交
    AddOrEditAccountCancel,                 //账户操作表单关闭
    form : {
		getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        resetFields,
	}
}){

    function Submit(e){
        e.preventDefault();
        validateFieldsAndScroll((error,values) => {
            if(!!error){ return; }
            AddOrEditAccountSubmit(values);
        })
    }

    function Cancel(){
        resetFields();
        AddOrEditAccountCancel();
    }

    /*检验手机号码*/
    function CheckMobile(rule, value, callback){
        if(!value){
            callback();
        }else if(!(/^1[0-9]{10}$/.test(value))){
            callback(new Error('请输入正确的手机号'));
        }else{
            callback();
        }
    }

    return (
        <Modal
            afterClose = {() => resetFields()}
            visible = { accountAddOrEditModalVisible }
            title = { accountAddOrEditModalType === 'add' ? '新增账户' : accountAddOrEditModalType === 'edit' ? '编辑账户' : '' }
            width = '438px'
            closable = { false }
            className = 'modal_wrap'
            footer={[
                <Button key = 'cancel' onClick = { Cancel }>取消</Button>,
                <Button key = 'submit' type = 'primary' onClick = { Submit } loading = { accountAddOrEditModalButtonLoading } disabled = { accountAddOrEditModalButtonLoading }>保存</Button>
            ]}
        >
            <Spin spinning = { accountAddOrEditModalLoading }>
                <FormItem
                    { ...formItemLayout }
                    label = '姓名'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('cnName', {
                        initialValue : accountAddOrEditModalType === 'edit' ? (accountAddOrEditModalData && accountAddOrEditModalData.cnName !== null && accountAddOrEditModalData.cnName !== undefined && accountAddOrEditModalData.cnName + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请输入姓名' , whitespace : true }
                        ]
                    })(
                        <Input style = {{ width : 180 }} placeholder = '请输入姓名'/>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = '手机号'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('phone', {
                        initialValue : accountAddOrEditModalType === 'edit' ? (accountAddOrEditModalData && accountAddOrEditModalData.phone !== null && accountAddOrEditModalData.phone !== undefined && accountAddOrEditModalData.phone + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请输入手机号' , whitespace : true },
                            { validator : CheckMobile }
                        ]
                    })(
                        <Input style = {{ width : 180 }} placeholder = '请输入手机号'/>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = '部门'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('deptId', {
                        initialValue : accountAddOrEditModalType === 'edit' ? (accountAddOrEditModalData && accountAddOrEditModalData.deptId !== null && accountAddOrEditModalData.deptId !== undefined && accountAddOrEditModalData.deptId + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请选择部门' , whitespace : true }
                        ]
                    })(
                        <Select
                            allowClear = { true }
                            showSearch = { true }
                            optionFilterProp = 'children'
                            notFoundContent = '未找到该部门'
                            placeholder = '请选择部门'
                            style = {{ width : 180 }}
                        >
                            { departData && departData.map((item,index) => <Option key = { index } value = { item.id + '' }>{ item.name + '' }</Option>) }
                        </Select>
                    )}
                </FormItem>
                { accountAddOrEditModalType === 'add' ?
                    <FormItem
                        { ...formItemLayout }
                        label = '初始密码'
                        className = 'common_form_item'
                    >
                        123456
                    </FormItem> : null
                }
            </Spin>
        </Modal>
    )
}

export default Form.create()(CourseAddOrEditModal);
