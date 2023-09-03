import React from 'react';
import {createStore, combineReducers} from 'redux';
import {v4} from "uuid";

/*
the state structure in redux store:
{
    activeThreadId: string,
    threads: [
    {
        id: '1-fca2',
        title: 'Buzz Aldrin',
        messages: [{
                text: action.text,
                timestamp: Date.now(),
                id: v4(),
            }],
    },
    {
        id: '2-be91',
        title: 'Michael Collins',
        messages: [],
    },
],
}
*/

/*
The combineReducers is a specific reducer that can process multiple fields using
multiple sub-reducers. In the old way, we would create a single function to
handle all state changes, which could lead to the function becoming too large.
Therefore, it's better to create multiple functions to handle sub-tasks.
combineReducers is an official API designed for this purpose.
 */
const reducer = combineReducers({
    activeThreadId: activeThreadIdReducer,
    threads: threadsReducer,
});

function activeThreadIdReducer(state = '1-fca2', action) {
    if (action.type === 'OPEN_THREAD') {
        return action.id;
    } else {
        return state;
    }
}

function findThreadIndex(threads, action) {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            return threads.findIndex(
                (t) => t.id === action.threadId
            );
        }
        case 'DELETE_MESSAGE': {
            return threads.findIndex(
                (t) => t.messages.find((m) => (
                    m.id === action.id
                ))
            );
        }
        default: {
            return threads
        }
    }
}

function threadsReducer(state = [
    {
        id: '1-fca2',
        title: 'Buzz Aldrin',
        messages: messagesReducer(undefined, {}),
    },
    {
        id: '2-be91',
        title: 'Michael Collins',
        messages: messagesReducer(undefined, {}),
    },
], action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
        case 'DELETE_MESSAGE': {
            const threadIndex = findThreadIndex(state, action);

            const oldThread = state[threadIndex];
            const newThread = {
                ...oldThread,
                messages: messagesReducer(oldThread.messages, action),
            };

            return [
                ...state.slice(0, threadIndex),
                newThread,
                ...state.slice(
                    threadIndex + 1, state.length
                ),
            ];
        }
        default: {
            return state;
        }
    }
}

function messagesReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            const newMessage = {
                text: action.text,
                timestamp: Date.now(),
                id: v4(),
            };
            return state.concat(newMessage);
        }
        case 'DELETE_MESSAGE': {
            return state.filter(m => m.id !== action.id);
        }
        default: {
            return state;
        }
    }
}

const store = createStore(reducer);

class ReduxChat extends React.Component {
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    render() {
        const state = store.getState();
        const activeThreadId = state.activeThreadId;
        const threads = state.threads;
        const activeThread = threads.find((t) => t.id === activeThreadId);

        const tabs = threads.map(t => (
            {
                title: t.title,
                active: t.id === activeThreadId,
                id: t.id,
            }
        ));

        return (
            <div className='ui segment'>
                <ThreadTabs tabs={tabs}/>
                <Thread thread={activeThread}/>
            </div>
        );
    }
}

class ThreadTabs extends React.Component {
    handleClick = (id) => {
        store.dispatch({
            type: 'OPEN_THREAD',
            id: id,
        });
    };

    render() {
        const tabs = this.props.tabs.map((tab, index) => (
            <div
                key={index}
                className={tab.active ? 'active item' : 'item'}
                onClick={() => this.handleClick(tab.id)}
            >
                {tab.title}
            </div>
        ));
        return (
            <div className='ui top attached tabular menu'>
                {tabs}
            </div>
        );
    }
}

class MessageInput extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: this.state.value,
            threadId: this.props.threadId,
        });
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div className='ui input'>
                <input
                    onChange={this.onChange}
                    value={this.state.value}
                    type='text'
                />
                <button
                    onClick={this.handleSubmit}
                    className='ui primary button'
                    type='submit'
                >
                    Submit
                </button>
            </div>
        );
    }
}

class Thread extends React.Component {
    handleClick = (id) => {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id,
        });
    };

    render() {
        return (
            <div className='ui center aligned basic segment'>
                <div className='ui comments'>
                    {this.props.thread.messages.map((message, index) => (
                        <div
                            className='comment'
                            key={index}
                            onClick={() => this.handleClick(message.id)}>
                            <div className='text'>
                                {message.text}
                                <span className='metadata'>@{message.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <MessageInput threadId={this.props.thread.id}/>
            </div>
        );
    }
}

export default ReduxChat;