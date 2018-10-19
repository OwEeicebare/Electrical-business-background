let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");
let userService = require("../service/user");


function checkUrl(url) {


    let igoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ];
    //旗子标签,判断当前的url是否需要进行登陆状态的校验,默认为需要
    let isNeedCheck = true;

    for (let i = 0; i < igoreUrls.length; i++) {
        let ignoreUrl = ignoreUndefined[i];
        if (ignoreUrl.test(url)) {
            isNeedCheck = false;
            break;
        }
    }
    return isNeedCheck;
    console.log(url)
}


module.exports = async (request, response, next) => {
//用户请求的路径
    let url = request.url;

    if (checkUrl(url)) {

        //获取token
        let token = request.get("token");
        if (!token) {
            throw Error("请求头中没有token数据,请登陆");
            //解密出来的json字符串,不是js对象,所以不能通过.属性的方式获取到属性值
            let tokenDecrypted = null;
            try {
                tokenDecrypted = encryptUtil.aesDecrypt(token, config.TOKEN_KEY);
            } catch (e) {
                throw Error("token解密失败,请登录")
            }
            //把json字符串转换成js对象
            let tokenJs = JSON.parse(tokenDecrypted);
            //获取token的有效期
            let expire = tokenJs.expire;
            if (Date.now() > expire) {
                throw Error("token已过期,请重新登陆");
            }
            //获取token中的用户名
            let username = tokenJs.username;
            //根据用户名查询用户
            let user = await userService.findByUsername(username);
            //如果查不到,说明token是伪造的
            if (!user) {
                throw Error("token无效,请重新登录")
            }
            //把查询到的用户储存到request对象身上
            request.user = user;
        }
    }

    next();
}
