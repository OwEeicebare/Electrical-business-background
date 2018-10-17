let router = require("express").Router();
let userService = require("../service/user");
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");

//注册逻辑
router.post("/", async (request, response) => {

    let regist = await userService.regist(request.body);
    console.log(regist + "_____________")

    response.success(regist);
})

//删除逻辑
router.delete("/:username", async (request, response) => {

    await userService.deleteUserByUsername(request.params.username);

    response.success();
})
//根据用户名查找逻辑
router.get("/:username", async (request, response) => {
    let username = request.params.username;
    let result = await userService.findByUsername(username);
    if (result) {
        result.password = "";
        response.success(result);
    } else {
        throw Error(`用户名为${username}的用户不存在`)
    }

})

//登陆的逻辑
router.post("/login", async (request, response) => {

    let user = await userService.login(request.body);

    let token = {
        userame: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    }

    //参数1:原文,参数2:密钥
    let encrypeDate = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    response.success(encrypeDate)
})


module.exports = router;