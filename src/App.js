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
import {
    Route,
    NavLink,
    Outlet,
    Routes,
    useLocation,
    useParams,
    Link
} from "react-router-dom";
import {RouterBlackSea} from "./js/util/RouterBlackSea";
import {getRoutes, login} from "./js/api/ApiHandler";
import MyReduxTest from "./js/redux/MyReducer";
import ReduxApp from "./js/redux/ReduxApp";
import ReduxChat from "./js/redux/ReduxChat";

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
                                    <li><NavLink to={'/p/123123'}>路径ID</NavLink></li>
                                    <li><NavLink to={'blackSea'}>RouterBlackSea</NavLink></li>
                                    <li><a href={'dev1'}>dev1</a></li>
                                    <li><NavLink to={'dev2'}>dev2</NavLink></li>
                                </ul>
                            </nav>
                            <Outlet>outlet</Outlet> {/*will be rendered along with each child route's element prop,*/}
                        </div>}>
                        {/*index属性是默认的子级路由*/}
                        <Route path={'/'} element={<IndexPage/>}/>
                        <Route path={'ccc'}>
                            <Route path="subpage" element={
                                <div>
                                    <p>SubPage</p>
                                    <MyReduxTest/>
                                    <hr/>
                                    <ReduxApp/>
                                    <hr/>
                                    <ReduxChat/>
                                </div>}/>
                        </Route>
                        {/* 如果是element引用方法的话，必须返回组件，且应该调用方法(否则获取不到param)*/}
                        {/*请注意，不要在 element 属性中使用函数调用，而是直接使用 JSX 表达式或 React 组件*/}
                        <Route path={'/p/:a'} loader={({params}) => {
                            return params.a;
                        }} handle={{
                            // you can put whatever you want on a route handle
                            // here we use "crumb" and return some elements,
                            // this is what we'll render in the breadcrumbs
                            // for this route
                            crumb: () => <NavLink to="/messages">Messages</NavLink>,
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

function IndexPage() {
    const {state} = useLocation();
    console.log(state)
    return (
        <div>
            <h1>首页</h1>
            {state && <p>Received data: {state.current}</p>}
        </div>
    );
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
        let location = useLocation();

        return (
            <div>
                {/*<h2>路径上的ID是 {JSON.stringify(useLoaderData1)}</h2>*/}
                <h2>路径上的ID是 {param.a}</h2>
                {/*通过点击close按钮，跳转到首页，因为实际开发中，可能路径总会变化，所以通过这种方式，更灵活*/}
                {/*<NavLink to={match.pathname}/>*/}
                <div>
                    <Link to={location.pathname + '/close'}>返回</Link>
                </div>
            </div>);
    }

    return <DynamicParamTag/>
}

function NotFound() {
    let location = useLocation();

    return (
        <div align={'center'}>
            <h2>Page Not Found! {location.pathname}
                <br/>
                <font color={'red'}>
                    <br/>
                    {JSON.stringify(location)}
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
