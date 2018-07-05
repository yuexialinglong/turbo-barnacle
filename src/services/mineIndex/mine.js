//我的招生
export function _getAdmissions(params) {
  return window.requestData(
    `${window.BASE_URL}/pdabc-mkt/user-agt/getEnrollStats/${params.id}`,
    {
      method: "get"
    }
  );
}
//我的主页
export function _getMine(params) {
  const re = window.requestData(
    `${window.BASE_URL}/pdabc-mkt/user-agt/${params.id}`,
    {
      method: "get"
    }
  );
  return re;
}
//获取微信分享参数
export function _getWechatConfig(params) {
  return window.requestData(
    `${window.BASE_URL}/pdabc-common/wx/getShareParam`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        isLogin: true
      },
      body: JSON.stringify({ url: params.url, type: 1 })
    }
  );
}
