// store内部存储了状态
// reducer是传进来的方法
function createStore(reducer, initialState) {

    const listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener)
    }

    let state = initialState ? initialState : 0;

    const getState = () => {
        console.log(state)
        return state
    }  // 返回状态

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    } // 处理事件

    return {
        subscribe,
        getState,
        dispatch
    } // 提供store对象
}

export default createStore;