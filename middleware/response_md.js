module.exports = (request, response, next) => {
    response.success = (result) => {
        response.send({
            code: 1,
            msg: "操作成功",
            data: result
        })
    }
    response.fail = (err) => {
        response.send({
            code: -1,
            msg: "操作失败",
            data: err.toString()
        })
    }

    next();
}
