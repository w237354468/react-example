import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import MyRouter from "./js/myRouter/MyRouter";

// 自定义了Router组件，可以通过这个变量来选择是否使用
const useMyRoute = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
if (useMyRoute) {
    root.render(
        <MyRouter>
            <App useMyRoute={useMyRoute}/>
        </MyRouter>
    );
} else {
    root.render(
        <Router basename={'/lcdp'}>
            <App useMyRoute={useMyRoute}/>
        </Router>
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
