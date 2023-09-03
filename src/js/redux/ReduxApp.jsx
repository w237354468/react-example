import {Component} from "react";
import {legacy_createStore as createStore} from "redux";
import {v4} from "uuid";

function msgReducer(msgState = {
    messages: []
}, action) {

    let type = action.type;
    if (type === 'ADD') {
        let newMsg = {
            'message': action.message,
            'id': action.id
        };
        msgState.messages = [...msgState.messages, newMsg]
        return msgState;
    } else if (type === 'DELETE') {
        msgState.messages = msgState.messages.filter(e => e.id !== action.id)
        return msgState
    }
    return msgState;
}

const store = createStore(msgReducer);

class ReduxApp extends Component {
    state = {
        value: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate();
        })
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleDelete(id) {
        store.dispatch({
            type: 'DELETE',
            id: id
        })
    }

    handleSubmit() {
        store.dispatch({
            type: 'ADD',
            message: this.state.value,
            id: v4().replaceAll('-', '')
        })
        this.setState({
            value: ''
        })
    }

    render() {
        let storageState = store.getState();
        return (
            <div>
                <div>Messages: {storageState.messages.map((item, index) => {
                    return (<div key={index} onClick={()=>this.handleDelete(item.id)}>
                        {item.message}@{item.id}
                    </div>)
                })}
                </div>
                <input type='text'
                       value={this.state.value}
                       onChange={this.handleChange}/>
                <button type='submit'
                        value={'发送消息'}
                        onClick={this.handleSubmit}>
                    提交
                </button>
            </div>
        );
    }
}

export default ReduxApp;