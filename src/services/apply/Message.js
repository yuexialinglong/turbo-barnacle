//报名
export function _btnClick(params) {
  // console.log(params,'报名信息入参')
  return window.requestData(`${window.BASE_URL}/pdabc-mkt/attach-info`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      isLogin: true
    },
    body: JSON.stringify(params)
  });
}
