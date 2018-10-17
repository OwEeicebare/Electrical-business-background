// 程序的主入口,作用就类似Springboot工程的入口类
require("express-async-errors");
//这个模块为全局捕获异常必须放在创建数据库之前
require("./db")
let express = require("express");
let morgan = require("morgan");//处理日志的模块


//引入conturller模块
let app = express();

//使用自定义的加强reponse的中间件
app.use(require("./middleware/response_md"));

app.use(morgan("combined"))//设置日志

app.use(express.json());
//让其可以解析json语句
//处理全局异常的中间件
app.use((err, request, response, next) => {

    response.fail(err);

    // response.send({
    //     codecs:-1,
    //     msg:"操作失败",
    //     data:err.toString()
    // })
})

app.listen(8000)


