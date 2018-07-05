import qs from 'qs';

//获取部门信息
export function GetDepartList(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/dept-info?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//账户列表查询
export function GetTableList(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-adm?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//新增账户提交
export function AddAccountSubmit(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-adm`, {
        method : 'post',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(params),
    });
}

//获取账户详情
export function EditAccountGetDetail(params) {
    let format_params = params || {};
    let id = format_params.id;
    delete format_params.id;
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-adm/${id}`, {
        method : 'get'
    });
}

//编辑账户提交
export function EditAccountSubmit(params) {
    let format_params = window.DeepCopy(params || {});
    let id = format_params.id;
    delete format_params.id;
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-adm/${id}`, {
        method : 'put',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(params),
    });
}

//删除账户
export function DeleteAccount(params) {
    let format_params = window.DeepCopy(params || {});
    let id = format_params.id;
    delete format_params.id;
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-adm/${id}`, {
        method : 'delete',
        headers: {
            'Content-Type' : "application/json",
        },
        body: JSON.stringify(format_params),
    });
}
