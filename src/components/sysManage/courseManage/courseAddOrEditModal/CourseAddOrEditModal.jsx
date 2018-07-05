import React from 'react';
import { Modal , Button , Form , Spin , Input , Select , Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span : 20 }
}

//系统设置 -> 课程管理新增编辑课程信息
function CourseAddOrEditModal({
    courseAddOrEditModalCourseLevel,    //课程等级
    courseAddOrEditModalType,           //modal类型(add/edit)
    courseAddOrEditModalVisible,        //modal是否显示
    courseAddOrEditModalLoading,        //modal加载状态
    courseAddOrEditModalButtonLoading,  //添加编辑课程按钮加载状态
    courseAddOrEditModalData,           //编辑时回填数

    AddOrEditCourseSubmit,              //课程操作表单提交
    AddOrEditCourseCancel,              //课程操作表单关闭
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
            //处理课时金额(按分计，需要*100)
            values.amount = !isNaN(values.amount) ? values.amount * 100 : undefined;
            AddOrEditCourseSubmit(values);
        })
    }

    function Cancel(){
        resetFields();
        AddOrEditCourseCancel();
    }

    function ValidatorNum(rule,value,callback){
        if(isNaN(value)){
            callback(new Error('请输入纯数字'));
        }else {
            callback();
        }
    }

    return (
        <Modal
            afterClose = {() => resetFields()}
            visible = { courseAddOrEditModalVisible }
            title = { courseAddOrEditModalType === 'add' ? '添加课程' : courseAddOrEditModalType === 'edit' ? `编辑课程(${courseAddOrEditModalData && courseAddOrEditModalData.cnName})` : '' }
            width = '558px'
            closable = { false }
            className = 'modal_wrap'
            footer={[
                <Button key = 'cancel' onClick = { Cancel }>取消</Button>,
                <Button key = 'submit' type = 'primary' onClick = { Submit } loading = { courseAddOrEditModalButtonLoading } disabled = { courseAddOrEditModalButtonLoading }>保存</Button>
            ]}
        >
            <Spin spinning = { courseAddOrEditModalLoading }>
                <FormItem
                    { ...formItemLayout }
                    label = '课程名称'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('cnName', {
                        initialValue : courseAddOrEditModalType === 'edit' ? (courseAddOrEditModalData && courseAddOrEditModalData.cnName !== null && courseAddOrEditModalData.cnName !== undefined && courseAddOrEditModalData.cnName + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请输入课程名称' , whitespace : true }
                        ]
                    })(
                        <Input style = {{ width : 180 }} placeholder = '请输入课程名称'/>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = '对应等级'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('level', {
                        initialValue : courseAddOrEditModalType === 'edit' ? (courseAddOrEditModalData && courseAddOrEditModalData.level !== null && courseAddOrEditModalData.level !== undefined && courseAddOrEditModalData.level + '' || undefined) : undefined,
//                        rules : [
//                            { required : true , message : '请选择对应等级' }
//                        ]
                    })(
                        <Select
                            allowClear = { true }
                            showSearch = { true }
                            optionFilterProp = 'children'
                            placeholder = '请选择对应等级'
                            style = {{ width : 180 }}
                        >
                            { courseAddOrEditModalCourseLevel && courseAddOrEditModalCourseLevel.map((item,index) => <Option key = { index } value = { item.key }>{ item.label }</Option>) }
                        </Select>
                    )}
                </FormItem>
                { courseAddOrEditModalType === 'edit' ?
                    <FormItem
                        { ...formItemLayout }
                        label = '是否启用'
                        className = 'common_form_item'
                    >
                        { getFieldDecorator('isUse', {
                            initialValue : courseAddOrEditModalType === 'edit' ? (courseAddOrEditModalData && courseAddOrEditModalData.isUse !== null && courseAddOrEditModalData.isUse !== undefined && courseAddOrEditModalData.isUse + '' || undefined) : undefined,
                            rules : [
                                { required : true , message : '请选择是否启用' }
                            ]
                        })(
                            <RadioGroup>
                                <Radio value = '1'>启用</Radio>
                                <Radio value = '0'>停用</Radio>
                            </RadioGroup>
                        )}
                    </FormItem> : null
                }
                <FormItem
                    { ...formItemLayout }
                    label = '课程总价'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('amount', {
                        initialValue : courseAddOrEditModalType === 'edit' ? (courseAddOrEditModalData && !isNaN(courseAddOrEditModalData.amount + '') && ( Number(courseAddOrEditModalData.amount) / 100 ).toFixed(2) + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请输入课程总价' , whitespace : true },
                            { validator: ValidatorNum }
                        ]
                    })(
                        <Input style = {{ width : 180 , marginRight : 5 }} placeholder = '请输入课程总价'/>
                    )}
                    <span>元/期</span>
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = '总课时'
                    className = 'common_form_item'
                >
                    { getFieldDecorator('lessons', {
                        initialValue : courseAddOrEditModalType === 'edit' ? (courseAddOrEditModalData && courseAddOrEditModalData.lessons !== null && courseAddOrEditModalData.lessons !== undefined && courseAddOrEditModalData.lessons + '' || undefined) : undefined,
                        rules : [
                            { required : true , message : '请输入总课时' , whitespace : true },
                            { validator: ValidatorNum }
                        ]
                    })(
                        <Input style = {{ width : 180 , marginRight : 5 }} placeholder = '请输入总课时'/>
                    )}
                    <span>课时/期</span>
                </FormItem>
            </Spin>
        </Modal>
    )
}

export default Form.create()(CourseAddOrEditModal);
