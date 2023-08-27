// useState
// 1. 引入useState函数
// 2. 执行函数传入初始值
// 3. [数据，修改方法]
// 4. 使用数据 修改数据

// 解决了函数组件无法保留状态的问题

import {useState} from "react";

function UseStateFunction() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}

export default UseStateFunction;