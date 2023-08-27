import axios from 'axios';

const url = 'http://127.0.0.1:3333/'

export function login() {
    axios.post(url + 'api/login')
        .then(resp => {
            localStorage.setItem('apiToken', resp.data.data)
            console.log('登录成功')
        }).catch(error => {
        console.log(error)
        console.log('登录失败')
    })
}

export function getRoutes() {
    return axios.get(url + 'routes', {
        headers: {
            'Access-Control-Allow-Origin': true
        }
    })
}

function setToken() {
    let apiToken = localStorage.getItem('apiToken');

}