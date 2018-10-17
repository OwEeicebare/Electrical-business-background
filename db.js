let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/product-manager", {useNewUrlParser: true})
let connection = mongoose.connection;

connection.on("error", err => {
    console.log("数据库链接失败:" + err.toString())
})

connection.on("open", () => {
    console.log("链接成功")
})