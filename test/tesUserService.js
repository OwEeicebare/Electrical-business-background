let userService = require("../service/user");
require("../db");

async function testUser() {
//添加
//     let user = {
//         username:"lili",
//         password:"123123",
//         role:100
//     };
//
//     let promise = await userService.regist(user);
//     console.log(promise)

    //  let user = {
    //      username:"rose",
    //      password:"12313",
    //  };
    // user = await userService.login(user)
    //
    //  console.log(user)

//     user = await userService.findByUsername("jace")
// console.log(user)

    await userService.deleteUserByUsername("rose")
}

testUser();