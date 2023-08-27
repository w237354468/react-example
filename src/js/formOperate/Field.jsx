import {Component} from "react";
import PropTypes from "prop-types";

class Field extends Component {

    static propTypes = {
        placeHolder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        // 传递不进来的、交给组件内部维护，维护value 和 err
        // 如果此处没有error来维护状态，那么就需要父组件来维护errorMsg，有了error，则能在组件内控制显隐
        this.state = {
            value: '',
            error: false
        }
    }

    onChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        let error = this.props.validate({name, value});
        this.setState({
            value, error
        })
        this.props.onChange({name, value})

    }

    render() {
        return (<div>
            {this.props.children}
            <input
                name={this.props.name}
                placeholder={this.props.placeHolder}
                value={this.props.value}
                onChange={this.onChange}>
            </input>
            {this.state.error ? <span style={{color: 'red'}}>{this.props.errorMsg}</span> : <span/>}
        </div>)
    }
}

export default Field;