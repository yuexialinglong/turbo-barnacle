import qs from 'qs';

//学生来源列表查询
export function GetTableList(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/channel-info?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//新增保存
export function AddSourseModalSubmit(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/channel-info`, {
        method : 'post',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(params),
    });
}

//编辑保存
export function ItemEditSave(params) {
    let format_params = window.DeepCopy(params || {});
    let id = format_params.id;
    delete format_params.id;
    return window.requestData(`${window.BASE_URL}/pdabc-common/channel-info/${id}`, {
        method : 'put',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(format_params),
    });
}

//删除
export function ItemOnDelete(params) {
    let format_params = window.DeepCopy(params || {});
    let id = format_params.id;
    delete format_params.id;
    return window.requestData(`${window.BASE_URL}/pdabc-common/channel-info/${id}`, {
        method : 'delete',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(format_params),
    });
}
