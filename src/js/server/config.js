const cors = require('cors');

function configHttp(app) {
    app.use(cors());
}

// 开启跨域
module.exports = { configHttp };