let orderService = require("../service/order");
let router = require("express").Router();

/**
 * 生成订单
 * url :  POST,http://localhost:8080/order
 * 请求体中传递,要添加的数据, {productId:001,count:10}
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {

    let result = await orderService.addItem(request.body);

    response.success(result);
})
/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/order?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
router.get("/", async (request, response) => {

    let result = await orderService.findByPage(request.query.page);

    response.success(result);

})

module.exports = router;