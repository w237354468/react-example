import {Component} from "react";
import PropTypes from "prop-types";
import {createBrowserHistory} from "history";
import {RouterContext} from "./MyRouter";

const history = createBrowserHistory();

/**
 * 变种 a标签，用于停止跳转，手动更新页面，而不用重新获取所有bundle.js
 */
class MyLink extends Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }

    static contextType = RouterContext

    componentDidMount() {
        this.context.history.listen(e=>this.forceUpdate())
    }

    constructor(props) {
        super(props);
        this.onLinkClick = this.onLinkClick.bind(this)
    }

    onLinkClick(e) {
        e.preventDefault();
        this.context.history.push(this.props.to)
    }

    render() {
        return (
            <a href={this.props.to} onClick={this.onLinkClick}>
                <code>{this.props.name}</code>
            </a>
        )
    }
}

export default MyLink