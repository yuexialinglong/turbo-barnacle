// import qs from 'qs';

//招生记录
export function _registrationRecord(params) {
  return window.requestData(
    `${window.BASE_URL}/pdabc-mkt/user-agt/getEnroll/${params.id}?num=1&row=500`,
    {
      method: "get",
    }
  );
}
//邀请记录
export function _invitedRecord(params) {
  return window.requestData(
    `${window.BASE_URL}/pdabc-mkt/user-agt/getInvite/${params.id}?num=1&row=500`,
    {
      method: "get"
    }
  );
}
