const login = require('./lib/login');
const tool = require("./lib/tool");
let logo_text = " _       _____   _   _             _          __  _   _____   _  \n| |     /  ___| | | | |           | |        / / | | |  ___| | | \n| |     | |     | | | |           | |  __   / /  | | | |__   | | \n| |     | |     | | | |           | | /  | / /   | | |  __|  | | \n| |___  | |___  | |_| |           | |/   |/ /    | | | |     | | \n|_____| \\_____| \\_____/           |___/|___/     |_| |_|     |_| \n __   _   _____   _____   _____   _____   _       _   _   _____  \n|  \\ | | /  _  \\ |  _  \\ | ____| |  _  \\ | |     | | | | /  ___/ \n|   \\| | | | | | | | | | | |__   | |_| | | |     | | | | | |___  \n| |\\   | | | | | | | | | |  __|  |  ___/ | |     | | | | \\___  \\ \n| | \\  | | |_| | | |_| | | |___  | |     | |___  | |_| |  ___| | \n|_|  \\_| \\_____/ |_____/ |_____| |_|     |_____| \\_____/ /_____/ ";

console.log("=================================================================="
    + "\n" + logo_text + "\n\n" +
    "==================================================================");

tool.info("LCU_WIFI_NodePlus 已经启动。");
tool.info("正在读取配置文件……");
 
let EportalURL = tool.getJSON("EportalURL")
let UserID = tool.getJSON("UserID");
let Password = tool.getJSON("Password");
let Pertime = tool.getJSON("Time");

tool.info("======================================================");
tool.info("地址：" + EportalURL);
tool.info("账号：" + UserID);
tool.info("密码：" + "**********");
tool.info("频率：" + Pertime + " (ms)");
tool.info("======================================================");

tool.info("读取完毕。");

let loginwww = () => {
    login.tryLogin(EportalURL, UserID, Password)
}
loginwww();
setInterval(loginwww, Pertime);

