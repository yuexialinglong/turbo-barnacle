import "./request.js";
import "./date.js";
import "./mouseRotate.js";

// 深拷贝方法
window.DeepCopy = function(params) {
  return JSON.parse(JSON.stringify(params));
};

// 计算列的最小宽度
window.calcWidth = function(array) {
  let commonWidth = 0;
  for (let i = 0; i < array.length; i++) {
    commonWidth += array[i].width;
  }
  return commonWidth;
};

/*
 * 判断元素的数据类型
 * @params
 * type string 期望的数据类型('Array','Object','Number','String')
 * param 需要判断类型的元素
 * @return
 * boolean 是否与期望数据类型相匹配的布尔值
 */
window.jusType = function(type, param) {
  return Object.prototype.toString.call(param) === `[object ${type}]`;
};

/*
 * 数组去重
 * @params
 * arr 需要检验的数组
 * @return
 * res 去重后的数组
 */
window.uniqueArr = function(arr) {
  const res = [];
  const json = {};
  for (let i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

/*
 * 取出数组中的最大值
 * @params
 * array 需要检验的数组
 * @return
 * max 数组中的最大值
 */
window.arrayMax = function(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
};

/*
 * 检测密码强度
 * @params
 * str 需要检验的密码
 * @return
 * nowLv 密码强度等级(0-4整数)
 */
window.checkPwdLevel = function(str) {
  let nowLv = 0;
  if (str.length < 6) {
    return nowLv;
  }
  if (/[0-9]/.test(str)) {
    nowLv++;
  }
  if (/[a-z]/.test(str)) {
    nowLv++;
  }
  if (/[A-Z]/.test(str)) {
    nowLv++;
  }
  if (/[\.|-|_]/.test(str)) {
    nowLv++;
  }
  return nowLv;
};

/*
 * 字符串空格处理
 * @params
 * str string需要检验的字符串
 * type string/number 1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return
 * string 筛选过后的字符串
 */
window.specialTrim = function(str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
};

/*
 * 循环遍历取出既定对象的方法
 */
window.loopArrGetObj = function(key, keyName, valueName, array) {
  for (let i = 0; i < array.length; i++) {
    if (key === array[i][keyName]) {
      return array[i][valueName];
    }
  }
};

window.turnTele = function(tele) {
  if (!tele) return "";
  const str = tele + "";
  const arr = str.split("");
  arr.splice(3, 4, "*", "*", "*", "*");
  const num = arr.join("");
  return num;
};

// 获取页面缩放比例
// function detectZoom() {
//   let ratio = 0;
//   const screen = window.screen;
//   const ua = navigator.userAgent.toLowerCase();

//   if (window.devicePixelRatio !== undefined) {
//     ratio = window.devicePixelRatio;
//   } else if (ua.indexOf('msie')) {
//     if (screen.deviceXDPI && screen.logicalXDPI) {
//       ratio = screen.deviceXDPI / screen.logicalXDPI;
//     }
//   } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
//     ratio = window.outerWidth / window.innerWidth;
//   }
//   if (ratio) {
//     ratio = Math.round(ratio * 100);
//   }
//   return ratio;
// }
