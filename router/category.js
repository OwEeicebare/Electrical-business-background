let categoryService = require("../service/category");
let router = require("express").Router();

/**
 * 添加post请求
 * @param category
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {

    let result = await categoryService.addItem(request.body);
    response.success(result);
})

//删除逻辑
router.delete("/:id", async (request, response) => {

    await categoryService.deleteById(request.params.id);

    response.success();

})
//更新逻辑
router.put("/:id", async (request, response) => {

    await categoryService.updateById(request.params.id, request.body);

    response.success();

})

//分页查询逻辑
router.get("/", async (request, response) => {

    let page = request.query.page;

    let result = await categoryService.findByPage(page);

    response.success(result);

})

module.exports = router;