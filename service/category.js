let Cetegory = require("../model/cetegory")
let config = require("../config");


/**
 * 添加
 * @param category
 * @returns {Promise<void>}
 */
async function addItem(category) {
    let result = await Cetegory.findOne({name: category.name});

    if (result) {
        throw Error("名称已经存在不可重复添加")
    }

    result = await Cetegory.create(category);

    return result
}

/**
 * 通过id删除
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {

    let result = await Cetegory.findOne({_id: id});
    if (!result) {
        throw Error("id为" + id + "的数据不存在不能删除")
    }

    result = await Cetegory.deleteOne({_id: id});
    if (result.n !== 1) {
        throw Error("删除id为" + id + "的数据失败")
    }

}

/**
 * 通过id更改数据
 * @param id
 * @returns {Promise<void>}
 */
async function updateById(id, category) {
    let result = await Cetegory.findOne({_id: id});

    if (!result) {
        throw Error("id为" + id + "的数据不存在")
    }
    result = await Cetegory.updateOne({_id: id}, category);
    if (result.n !== 1) {
        throw Error("更新id为" + id + "的数据失败")
    }
}

/**
 * 分页查询
 * @param page
 * @returns {Promise<void>}
 */
async function findByPage(page = 1) {
    //偏移量的计算
    let offset = (page - 1) * config.PAGE_SIZE;
    //返回find查询的偏移量与页数的数据
    return await Cetegory.find().skip(offset).limit(config.PAGE_SIZE);

}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage

}

