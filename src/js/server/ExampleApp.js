const express = require('express');
const {configHttp} = require("./config");
const {addController} = require("./webapi");

const app = express();
const port = 3333;
const appStartCallBack = () => {
    console.log('Server is running on port 3333');
}

configHttp(app);

addController(app);

// 启动应用
app.listen(port, appStartCallBack);