const security = require('./security.js');
const request = require("request");
const tool = require("./tool");


function encryptedPassword (password) {

    let passwordEncode = encodeURIComponent(encodeURIComponent(password)).split("").reverse().join("");
    let publicKeyExponent = "10001";
    let publicKeyModulus = "94dd2a8675fb779e6b9f7103698634cd400f27a154afa67af6166a43fc26417222a79506d34cacc7641946abda1785b7acf9910ad6a0978c91ec84d40b71d2891379af19ffb333e7517e390bd26ac312fe940c340466b4a5d4af1d65c3b5944078f96a1a51a5a53e4bc302818b7c9f63c4a1b07bd7d874cef1c3d4b2f5eb7871";
    RSAUtils.setMaxDigits(200);
    let key = RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
    let passwordEncry = RSAUtils.encryptedString(key, passwordEncode);

    return passwordEncry;
}

function isLogined(eportalURL) {
    const option = {
        url: eportalURL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'DNT': '1',
            'Host': '172.30.2.2:8088',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Mobile Safari/537.36'
        }
    }
    return new Promise((resolve, reject) => {
        request(option, function (e, response) {
                let body = response.body;
                let nasip = /nasip=*[A-Za-z0-9]+/;
                nasip = nasip.exec(body);

                if (nasip != null) {
                    resolve(nasip[0].replace("nasip=", ""));
                } else {
                    resolve(true);

                }
        })
    });
}
function login(eportalURL,userid, password, logined) {
    let qs = {
        userId: userid,
        password: encryptedPassword(password),
        service: '',
        queryString: encodeURIComponent('nasip=' + logined),
        operatorUserId: '',
        passwordEncrypt: 'true'
    }
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'DNT': '1',
        'Host': '172.30.2.2:8088',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Mobile Safari/537.36'
    }
    return new Promise((resolve, reject) => {
        request({
            timeout: 5000,
            method: 'GET',
            url: eportalURL + "/eportal/InterFace.do?method=login",
            qs: qs,
            headers: headers
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                resolve("error");
            }
        });
    })

}

module.exports.tryLogin = async (eportalURL,userid, password) => {
    tool.info ("开始尝试登录！")
    let logined = await isLogined(eportalURL).then(function (req) {
        return req;
    })
    if (logined == true) {
        tool.info ("网络已登录，无需再次登录！");
    } else {
        tool.info ("网络未登录，开始登录！");
        let logining = await login(eportalURL,userid, password, logined).then(function (req) {
            return req;
        })
        let result = JSON.parse(logining)["result"];
        if(result =="success"){
            tool.info ("登陆成功！");
        }else{
            tool.info ("登陆错误，请检查账号密码或其他问题！");
        }
    }

}
