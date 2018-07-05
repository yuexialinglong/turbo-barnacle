//保存
export function _saveClick(params) {
    // console.log(params,'设置用户名入参')
    return window.requestData(`${window.BASE_URL}/pdabc-common/user/${params.id}`, {
        method : 'put',
        headers: {
            'Content-Type' : "application/json",
            // isLogin : true
        },
        body: JSON.stringify({cnName:params.cnName}),
    });
}