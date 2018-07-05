import fetch from "dva/fetch";
import reqwest from "reqwest";
import Promise from "promise-polyfill";
import { Toast } from "antd-mobile";

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
window.requestData = function(url, options) {
  if (window.navigator.onLine) {
    if (options && options.headers && !!options.headers.isLogin) {
      // 登陆请求
      return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(ret => ({ ret }))
        .catch(err => ({ err }));
    } else {
      // 一般请求
      const accessToken =
        !!window.localStorage &&
        !!window.localStorage.userInfo &&
        JSON.parse(window.localStorage.userInfo).accessToken;
      // let userId = !!window.localStorage && !!window.localStorage.userInfo && JSON.parse(window.localStorage.userInfo).id;
      if (!accessToken) {
        Toast.fail("登录失效，请重新登陆");
        window.localStorage.setItem("userInfo", JSON.stringify({}));
        window.location = "/login";
      } else {
        const userMsg = { "access-token": accessToken };
        options = {
          ...options,
          headers: {
            ...options.headers,
            ...userMsg
          }
        };
        return fetch(url, options)
          .then(checkStatus)
          .then(parseJSON)
          .then(ret => {
            if (ret && ret.errorCode === 102) {
              Toast.fail("登录失效，请重新登陆");
              window.localStorage.setItem("userInfo", JSON.stringify({}));
              window.location = "/login";
              return {
                ret: {
                  errorCode: ret.errorCode,
                  errorMessage: "登录失效，请重新登陆"
                }
              };
            }
            return { ret };
          })
          .catch(err => ({ err }));
      }
    }
  } else {
    Toast.fail("请检查您的网络是否连接");
  }
};

window.serviceRequest = function(url, type, params, suc, fail) {
  if (window.navigator.onLine) {
    const accessToken =
      !!window.localStorage &&
      !!window.localStorage.userInfo &&
      JSON.parse(window.localStorage.userInfo).accessToken;
    const userId =
      !!window.localStorage &&
      !!window.localStorage.userInfo &&
      JSON.parse(window.localStorage.userInfo).id;
    if (!accessToken) {
      Toast.fail("登录失效，请重新登录");
      window.location = "/login";
      return;
    }
    const userMsg = { "access-token": accessToken, userId };
    // 异步请求
    reqwest({
      url,
      method: type || "post",
      type: "json",
      headers: {
        ...userMsg
      },
      data: params
    }).then(
      result => {
        if (result.errorCode === 0) {
          if (suc) {
            suc(result);
          }
        } else if (result.errorCode === 102) {
          Toast.fail("登录失效，请重新登录");
          window.location = "/login";
          return {
            result: {
              errorCode: result.errorCode,
              errorMessage: "登录失效，请重新登陆"
            }
          };
        } else if (fail) {
          fail(result);
        }
      },
      () => {
        Toast.fail("服务器开小差啦");
      }
    );
  } else {
    Toast.fail("请检查您的网络是否连接");
  }
};
