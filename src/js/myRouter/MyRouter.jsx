import React, {Component} from "react";
import PropTypes from "prop-types";
import {createBrowserHistory} from "history";

/**
 * Router组件
 * 1. 用于为子组件提供location和history的上下文
 * 2. 每当history发生变化时，需要重新渲染应用程序
 */
class MyRouter extends Component {

    static childContextTypes = {
        history: PropTypes.object,
        location: PropTypes.object
    }

    constructor(props) {
        super(props);

        // 设置最上层的history，当history更新时，强制刷新整个页面
        this.history = createBrowserHistory();
        this.history.listen(() => this.forceUpdate());
    }

    getChildContext() {
        return {
            history: this.history,
            location: window.location
        }
    }

    render() {
        return (
            <RouterContext.Provider value={this.getChildContext()}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export const RouterContext = React.createContext()
export default MyRouter