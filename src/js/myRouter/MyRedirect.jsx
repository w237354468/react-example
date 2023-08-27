import {Component} from "react";
import {RouterContext} from "./MyRouter";
import {TestContext} from "../../App";

/**
 * Redirect组件会在渲染时立即修改位置
 */
class MyRedirect extends Component {

    static contextType = RouterContext

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.context.history.push(this.props.to)
    }

    render() {
        return null;
    }
}

export default MyRedirect