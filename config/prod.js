//生产环境

module.exports = {
    PORT: 80,
    DB: "malls",
    TOKEN_EXPIRE: 1000 * 60 * 60 * 24 * 7,
    TOKEN_KEY: "malls_prod",
    PAGE_SIZE: 10

}