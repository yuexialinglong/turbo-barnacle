import qs from 'qs';

//系统设置 -> 课程管理列表查询
export function GetTableList(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/course-info?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//系统设置 -> 课程新增
export function ItemOnAdd(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/course-info`, {
        method : 'post',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(params),
    });
}

//系统设置 -> 获取详情
export function GetDetail(params) {
    let format_params = window.DeepCopy(params || {});
    let courseId = format_params.courseId;
    delete format_params.courseId;
    return window.requestData(`${window.BASE_URL}/pdabc-crm/course-info/${courseId}`, {
        method : 'get'
    });
}

//系统设置 -> 课程编辑
export function ItemOnEdit(params) {
    let format_params = window.DeepCopy(params || {});
    let courseId = format_params.courseId;
    delete format_params.courseId;
    return window.requestData(`${window.BASE_URL}/pdabc-crm/course-info/${courseId}`, {
        method : 'put',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(format_params),
    });
}
