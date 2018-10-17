let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");

/**
 * 用户注册
 * @param user
 * @returns {Promise<void>}
 */
async function regist(user) {
    let result = findByUser(user.username);

    if (result) {
        throw Error("用户名已经存在")
    }
    //加密操作
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    //从新赋值
    user.role = 0;


    let result = await User.create(user);
    return result;
}

/**
 * 通过用户名删除用户
 * @param username
 * @returns {Promise<void>}
 */
async function deleteUserByname(username) {
    await isExistByUsename(username);

    let result = await User.deleteOne({username: username});
    if (result.name !== 1) {
        throw Error("删除失败")
    }

}

/**
 * 通过用户名查找用户
 * @param username
 * @returns {Promise<void>}
 */
async function findByUser(username) {
    return await User.findOne({username: username})
}

/**
 * 用户的登陆
 * @param user
 * @returns {Promise<void>}
 */
async function login(user) {
    await isExistByUsename(user.username);//检查用户是否存在

    let password = user.password;//拿到密码
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空")
    }
    //加密密码
    user.password = encryptUtil.md5Hmac(user.password, user.username);

    await  User.findOne(user);
}

//根据用户名检查用户是否存在
async function isExistByUsename(username) {
    let result = findByUser(user.username);

    if (!result) {
        throw Error("用户名不存在")
    }
}