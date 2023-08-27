// import logo from './logo.svg';
import './App.css';
import React from "react";
import {useState} from 'react';
import MyLink from "./js/myRouter/MyLink";
import MyRoute from "./js/myRouter/MyRoute";
import FormSubmitExample from "./js/formOperate/FormSubmitExample";
import UseStateExample from "./js/funcComponent/UseStateExample";
import ProductList from "./js/product/ProductList";
import TimersDashBoard from "./js/timer/TimersDashBoard";
import BlackSea from "./js/util/BlackSea";
import {Route, NavLink, Outlet, Routes, useLocation, useParams} from "react-router-dom";
import {RouterBlackSea} from "./js/util/RouterBlackSea";
import {getRoutes, login} from "./js/api/ApiHandler";

function App(props) {

    const [state, setState] = useState({
            routes: [],
            fetchedRoute: false
        }
    );

    // 如果没有加载过路由，按么就调用接口，先返回错误组件，如果调用成功（异步）后就立即刷新页面，加载路由
    if (!state.fetchedRoute) {
        login() // 登陆
        fetchRoutes(setState)
        return (<NotFound/>)
    }

    if (!props.useMyRoute) {
        return (
            <div>
                <Routes> {/*V6使用Routes代替Switch*/}
                    <Route element={
                        <div align={'center'}>
                            <nav>
                                <ul>
                                    <li><NavLink to={'/'}>首页</NavLink></li>
                                    <li><NavLink to={'/123123'}>路径ID</NavLink></li>
                                    <li><NavLink to={'blackSea'}>RouterBlackSea</NavLink></li>
                                    <li><a href={'dev1'}>dev1</a></li>
                                    <li><NavLink to={'dev2'}>dev2</NavLink></li>
                                </ul>
                            </nav>
                            <Outlet/> {/*will be rendered along with each child route's element prop,*/}
                        </div>}>
                        <Route path={'/'} index={false} element={<div><h1>首页</h1></div>}/>
                        {/* 如果是element引用方法的话，必须返回组件，且应该调用方法(否则获取不到param)*/}
                        {/*请注意，不要在 element 属性中使用函数调用，而是直接使用 JSX 表达式或 React 组件*/}
                        <Route path={'/:a'} loader={({params}) => {
                            return params.a;
                        }} element={renderDynamicParamTag()}/>
                        <Route path={'/blackSea'} element={<RouterBlackSea/>}/> {/*loader用来加载数据 HTTP或其他*/}
                        <Route path={'/dev1'} element={Dev1Component()}/>
                        <Route path={'/dev2'} element={Dev2Component()}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    <li><MyLink to={'/'} name={'首页'}> /</MyLink></li>
                    <li><MyLink to={'blackSea'} name={'blackSea'}> /</MyLink></li>
                    <li><a href={'dev1'}> dev1</a></li>
                    <li><MyLink to={'dev2'} name={'dev2'}></MyLink></li>
                </ul>
                <MyRoute path={'/'} component={React.Fragment}/>
                <MyRoute path={'/blackSea'} component={BlackSea}/>
                <MyRoute path={'/dev1'} component={Dev1Component}/>
                <MyRoute path={'/dev2'} component={Dev2Component}/>
            </div>
        );
    }
}

const Dev1Component = () => {
    return (
        <div>
            <FormSubmitExample/>
            <UseStateExample/>
        </div>
    )
}

const Dev2Component = () => {
    return (
        <div>
            <ProductList/>
            <TimersDashBoard/>
        </div>
    )
}

function renderDynamicParamTag() {
    function DynamicParamTag() {
        let param = useParams();
        console.log(JSON.stringify(param))
        return (
            <div>
                {/*<h2>路径上的ID是 {JSON.stringify(useLoaderData1)}</h2>*/}
                <h2>路径上的ID是 {param.a}</h2>
            </div>);
    }
    return <DynamicParamTag/>
}

function NotFound() {
    let location = useLocation();

    return (
        <div align={'center'}>
            <h2>Page Not Found! <br/>
                <font color={'red'}>
                    {location.pathname}
                </font></h2>
        </div>
    );
}

function fetchRoutes(setState) {
    getRoutes().then(resp => {
        console.log(resp)
        setState({
            routes: resp.data.data,
            fetchedRoute: true
        })
    }).catch(error => {
        console.log(error)
        setState({
            routes: []
        })
    })
}

export default App;
