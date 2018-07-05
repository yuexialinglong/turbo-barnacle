import moment from "moment";

// 获取当前时间
window.GetNowDate = function(params) {
  let date = moment().format("YYYY-MM-DD");
  window.serviceRequest(
    `${window.BASE_URL}/pdabc-common/common/getCurTimeStamp`,
    "get",
    { ...params },
    ret => {
      // 成功回调
      if (ret && ret.errorCode === 0) {
        date = ret.data;
      }
    },
    () => {
      // 失败回调
    }
  );
  return date;
};

// 通过日期获取年龄接口
window.GetAgeByDate = function(birDate) {
  let age;
  window.serviceRequest(
    `${window.BASE_URL}/pdabc-common/user/getAgeByBirDate`,
    "get",
    { birDate: moment(birDate).format("YYYY-MM-DD") },
    ret => {
      // 成功回调
      if (ret && ret.errorCode === 0) {
        age = ret.data && ret.data.age;
      }
    },
    () => {
      // 失败回调
    }
  );
  if (isNaN(`${age}`)) {
    // 总之接口请求失败等一系列意料之外的事件出现，则调用前端自身计算方法
    age = window.JustifyAge(birDate);
  }
  return age;
};

// 获取当前日期是周几
window.GetWeek = function(date, language) {
  const week = new Date(date).getDay();
  const cnWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const enWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  if (language === "Chinese") {
    return cnWeek[week];
  }
  return enWeek[week];
};

/*
 * 根据字符串返回周几
 * @params
 * str string 字符串'0000111' 表示周五周六周日上课
 * num number 0/1，如果传0，则返回0是周几；如果传1，则返回1是周几
 */
window.JusWeekDay = function(str, num) {
  const format_num = !isNaN(`${num}`) ? num : 1;
  const cnWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  if (str && str.length === cnWeek.length) {
    const return_arr = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === format_num) {
        return_arr.push(cnWeek[i]);
      }
    }
    return return_arr.join("，");
  }
};

/*
 * 获取上课时间段
 * @params
 * target string 逗号分隔的id字符串
 * baseInfo array 可上课时间段数组
 */
window.GetClassTime = function(target, baseInfo) {
  if (target && target.length > 0) {
    const return_arr = [];
    const format_target = target.split(",");
    for (let i = 0; i < baseInfo.length; i++) {
      if (
        format_target.indexOf(baseInfo[i].id) > -1 ||
        format_target.indexOf(`${baseInfo[i].id}`) > -1
      ) {
        return_arr.push(`${baseInfo[i].startTime}~${baseInfo[i].endTime}`);
      }
    }
    return return_arr.join("，");
  }
};

// 获取两个日期之间相差年龄
window.JustifyAge = function(strBirthday, endBirthday) {
  let returnAge;
  const strBirthdayArr = moment(strBirthday)
    .format("YYYY-MM-DD")
    .split("-");
  const birthYear = strBirthdayArr[0];
  const birthMonth = strBirthdayArr[1];
  const birthDay = strBirthdayArr[2];

  const endBirthdayArr = moment(endBirthday)
    .format("YYYY-MM-DD")
    .split("-");
  const nowYear = endBirthdayArr[0];
  const nowMonth = endBirthdayArr[1];
  const nowDay = endBirthdayArr[2];

  if (nowYear === birthYear && new Date(strBirthday) < new Date(endBirthday)) {
    returnAge = 1; // 同年且不是当日 则为1岁
  } else {
    const ageDiff = nowYear - birthYear; // 年之差
    if (ageDiff >= 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay; // 日之差
        if (dayDiff <= 0) {
          returnAge = ageDiff;
        } else {
          returnAge = ageDiff + 1;
        }
      } else {
        const monthDiff = nowMonth - birthMonth; // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff;
        } else {
          returnAge = ageDiff + 1;
        }
      }
    } else {
      returnAge = "不合法"; // 返回不合法 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; // 返回周岁年龄
};

/*
 * 计算二个日期间有几个星期一到星期日
 * date_sta及date_end需是Date型参数
 */
window.getWeekDays = function(startDate, endDate, weekNum) {
  const date_sta = new Date(startDate);
  const date_end = new Date(endDate);
  if (date_sta > date_end) {
    // console.error("开始日期不能大于结束日期");
    return;
  }
  const days = (date_end - date_sta) / 1000 / 60 / 60 / 24 + 1; // 二个日期相关得到天数
  const sta_week_day = date_sta.getDay(); // 返回星期几（星期日为0，星期一为1...星期六为6
  const weeks = Math.floor(days / 7);
  const day = days % 7;
  const weekday = [];
  let re;
  weekday[0] = weekday[1] = weekday[2] = weekday[3] = weekday[4] = weekday[5] = weekday[6] = weeks;
  for (let i = 0; i < day; i++) {
    const n = (sta_week_day + i) % 7;
    weekday[n]++;
  }
  switch (weekNum) {
    case 7:
      re = weekday[0];
      break;
    case 1:
      re = weekday[1];
      break;
    case 2:
      re = weekday[2];
      break;
    case 3:
      re = weekday[3];
      break;
    case 4:
      re = weekday[4];
      break;
    case 5:
      re = weekday[5];
      break;
    case 6:
      re = weekday[6];
      break;
    default:
      re = {
        Sun: weekday[0],
        Mon: weekday[1],
        Tues: weekday[2],
        Wed: weekday[3],
        Thur: weekday[4],
        Fri: weekday[5],
        Sat: weekday[6]
      };
      break;
  }
  return re;
};

// 获取一个月有多少天(入参为年，月)
window.getCountDays = function(year, month) {
  let dayCount;
  const now = new Date(year, month, 0);
  dayCount = now.getDate();
  return dayCount;
};

/*
 * 判断星座
 * @params
 * date 日期
 * @return
 * 星座字符串
 */
window.jusConstellation = function(date) {
  const dataFormat = new Date(date);
  const year = dataFormat.getFullYear();
  if (
    new Date(`${year}-03-21`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-04-19`).getTime() >= dataFormat.getTime()
  ) {
    return "白羊座";
  }
  if (
    new Date(`${year}-04-20`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-05-20`).getTime() >= dataFormat.getTime()
  ) {
    return "金牛座";
  }
  if (
    new Date(`${year}-05-21`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-06-20`).getTime() >= dataFormat.getTime()
  ) {
    return "双子座";
  }
  if (
    new Date(`${year}-06-22`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-07-22`).getTime() >= dataFormat.getTime()
  ) {
    return "巨蟹座";
  }
  if (
    new Date(`${year}-07-23`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-08-22`).getTime() >= dataFormat.getTime()
  ) {
    return "狮子座";
  }
  if (
    new Date(`${year}-08-23`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-09-22`).getTime() >= dataFormat.getTime()
  ) {
    return "处女座";
  }
  if (
    new Date(`${year}-09-23`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-10-23`).getTime() >= dataFormat.getTime()
  ) {
    return "天秤座";
  }
  if (
    new Date(`${year}-10-24`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-11-22`).getTime() >= dataFormat.getTime()
  ) {
    return "天蝎座";
  }
  if (
    new Date(`${year}-11-23`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-12-21`).getTime() >= dataFormat.getTime()
  ) {
    return "射手座";
  }
  if (
    new Date(`${year}-12-22`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-12-31`).getTime() >= dataFormat.getTime()
  ) {
    return "摩羯座";
  }
  if (
    new Date(`${year}-01-01`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-01-19`).getTime() >= dataFormat.getTime()
  ) {
    return "摩羯座";
  }
  if (
    new Date(`${year}-01-20`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-02-18`).getTime() >= dataFormat.getTime()
  ) {
    return "水瓶座";
  }
  if (
    new Date(`${year}-02-19`).getTime() <= dataFormat.getTime() &&
    new Date(`${year}-03-20`).getTime() >= dataFormat.getTime()
  ) {
    return "双鱼座";
  }
  return undefined;
};
