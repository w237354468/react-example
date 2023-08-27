import React from "react";
import PropTypes, {func} from "prop-types";
import {RouterContext} from "./MyRouter";

/**
 * Route
 * 与浏览器当前的path相关，路径匹配，则显示对应的Route
 */
class MyRoute extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.elementType
    }

    static contextType = RouterContext

    constructor(props) {
        super(props);
    }

    render() {
        this.routerContext = this.context

        /**
         * 此处会有个问题，只用match方法的话，输入 /dev1/dev2会加载/dev1和/dev2，因为都匹配成功了
         */
        const pathname = this.routerContext.location.pathname
        if (pathname.match(this.props.path)) {
            return (
                React.createElement(this.props.component)
            );
        } else {
            return null;
        }
    }
}
export default MyRoute;