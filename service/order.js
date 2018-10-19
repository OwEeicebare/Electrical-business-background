let Order = require("../model/order");
let Product = require("./product");
let Big = require("big.js");
let config = require("../config");

/**
 * 生成订单
 * {id,cont}
 * @returns {Promise<void>}
 */
async function addItem(order) {
    //根据商品ID,查询商品的库存,价格,商品名
    let product = await Product.findById(order.productId);
    if (!product) {//取反判断商品有没有
        throw Error("id为" + order.productId + "的商品不存在");
    }
    //为了避免中途篡改所以在这里从新赋值
    order.productName = product.name;
    order.productPrice = product.price;
    //查询库存是否充足
    if (order.count > product.stock) {
        throw Error("商品库存不下单失败");
    }
    //计算总金额
    let price = product.price;
    let total = Big(price).times(price * order.count);
    order.total = total;

    //生成订单
    let result = await Order.create(order);

    //扣减库存
    await Product.updateById(order.productId, {stock: product.stock - order.count});

    return result;
}

/**
 * 分页查询
 * @returns {Promise<void>}
 */
async function findByPage(page = 1) {

    let offset = config.PAGE_SIZE * (page - 1);

    let result = await Order.find().skip(offset).limit(config.PAGE_SIZE);

    return result
}

module.exports = {
    addItem,
    findByPage
}
