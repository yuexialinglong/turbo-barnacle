export function _bindAlipay(params) {
  // console.log(params);
  return window.requestData(
    `${window.BASE_URL}/pdabc-common/user-agt/${params.params.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.params)
    }
  );
}
export function _withdrawApply(params) {
  return window.requestData(`${window.BASE_URL}/pdabc-mkt/withdraw-detail`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.params)
  });
}
