//短信验证码
export function _getVeryCode(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/sms-code`, {
        method : 'post',
        headers: {
            'Content-Type' : "application/json",
            isLogin : true
        },
        body: JSON.stringify(params),
    });
}
//登录/注册
export function _loginBtn(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/oauth/sms/agt`, {
        method : 'post',
        headers: {
            'Content-Type' : "application/json",
            isLogin : true
        },
        body: JSON.stringify(params),
    });
}