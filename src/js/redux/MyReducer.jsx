import createStore from "./MyStore";
import {Component} from "react";

function myReducer(state, action) {
    if (action === 'INCREMENT') {
        return state + 1
    } else if (action === 'DECREMENT') {
        return state - 1;
    } else {
        return state;
    }
}

class MyReduxTest extends Component {

    constructor(props) {
        super(props);
        this.myStore = createStore(myReducer, 0);
    }

    componentDidMount() {
        this.myStore.subscribe(() => {
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div>
                <p>count {this.myStore.getState()}</p>
                <button onClick={() => this.myStore.dispatch('INCREMENT')}>increment</button>
                <button onClick={() => this.myStore.dispatch('DECREMENT')}>decrement</button>
            </div>
        )
    }
}

export default MyReduxTest;