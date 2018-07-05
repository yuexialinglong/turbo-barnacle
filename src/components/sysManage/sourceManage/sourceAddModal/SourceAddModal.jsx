import React from 'react';
import { Modal , Button , Form , Spin , Input , Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span : 20 }
}

//系统设置 -> 系统设置添加学生来源modal
function SourceAddModal({
    sourceType,                             //用户来源渠道
    sourseAddModalVisible,                  //modal是否显示
    sourseAddModalLoading,                  //modal加载状态
    sourseAddModalButtonLoading,            //modal提交按钮加载状态

    AddSourseModalSubmit,                   //新增来源表单提交
    AddSourseModalCancel,                   //新增来源表单关闭
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
            AddSourseModalSubmit(values);
        })
    }

    function Cancel(){
        resetFields();
        AddSourseModalCancel();
    }

    return (
        <Modal
            afterClose = {() => resetFields()}
            visible = { sourseAddModalVisible }
            title = '添加渠道来源'
            width = '558px'
            closable = { false }
            className = 'modal_wrap'
            footer={[
                <Button key = 'cancel' onClick = { Cancel }>取消</Button>,
                <Button key = 'submit' type = 'primary' onClick = { Submit } loading = { sourseAddModalButtonLoading } disabled = { sourseAddModalButtonLoading }>保存</Button>
            ]}
        >
            <Spin spinning = { sourseAddModalLoading }>
                <FormItem
                    { ...formItemLayout }
                    label = '渠道名称'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('name', {
                        rules : [
                            { required : true , message : '请输入渠道名称' , whitespace : true }
                        ]
                    })(
                        <Input placeholder = '请输入渠道名称'/>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = '渠道类型'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('type', {
                        rules : [
                            { required : true , message : '请选择渠道类型' , whitespace : true }
                        ]
                    })(
                        <Select
                            allowClear = { true }
                            showSearch = { true }
                            optionFilterProp = 'children'
                            placeholder = '请选择渠道类型'
                            style = {{ width : 180 }}
                        >
                            { sourceType && sourceType.map((item,index) => <Option key = { index } value = { item.key }>{ item.label }</Option>) }
                        </Select>
                    )}
                </FormItem>
            </Spin>
        </Modal>
    )
}

export default Form.create()(SourceAddModal);
