const API_TOKEN = "1234567890"

const addController = (app) => {

// 定义路由
    app.get('/', (req, res) => {
        res.send('Hello from the root path!');
    });

    app.post('/api/login', (req, resp) => {
        resp.send(getSuccResp(API_TOKEN))
    })

    app.get('/routes', (req, res) => {

        res.setHeader('content-type', 'application/json')
        const route = ['/dev1', '/dev2', '/blackSea']
        res.send(route);
    });
}

function getSuccResp(result) {

    return {
        code: 200,
        msg: 'success',
        data: result
    }
}

module.exports = { addController };