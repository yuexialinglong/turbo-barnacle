import dva from "dva";
import createHistory from "history/createBrowserHistory";
import "./index.css";
import "../../utils/commonParams.js";
import "../../utils/commonFunction.js";
import env from "./env.json";
import { message } from "antd";

// 根据375宽的设计稿 将1rem设置为37.5px
document.documentElement.style.fontSize = `${document.documentElement
  .clientWidth / 10}px`;
// 浏览器宽高防抖事件
window.onresize = (function() {
  let t;
  return function() {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      document.documentElement.style.fontSize = `${document.documentElement
        .clientWidth / 10}px`;
    }, 500);
  };
})();

window._critical_width = "1366px"; // UI临界宽度
window._critical_height = "768px"; // UI临界高度

// 通过url判断接口BASE_URL
for (let i = 0; i < env.length; i++) {
  if (env[i].host === window.location.host) {
    window.BASE_URL = env[i].BASE_URL;
    break;
  }
}

// window.BASE_URL = window.BASE_URL || "https://api.pdabc.com";
window.BASE_URL = window.BASE_URL || "/panda";

// 1. 初始化
function onError(e) {
  message.error(e.message, 1);
}
const app = dva({
  onError,
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model

/** ************* 登陆 ************************ */
app.model(require("../../models/Example").default);
app.model(require("../../models/maketingTools/login/Login").default);
app.model(require("../../models/maketingTools/login/SetUserName").default);
app.model(require("../../models/maketingTools/record/Record").default);
app.model(require("../../models/maketingTools/mineIndex/MineIndex").default);
app.model(require("../../models/maketingTools/withdraw/Alipay").default);
app.model(require("../../models/maketingTools/apply/Message").default);
app.model(
  require("../../models/maketingTools/invitation/InvitationLetter").default
);
app.model(require("../../models/maketingTools/login/Preview").default);
app.model(require("../../models/maketingTools/apply/InfoMessage").default);
app.model(require("../../models/maketingTools/apply/apply").default);
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
