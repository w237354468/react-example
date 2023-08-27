import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";

export const RouterBlackSea = () => {

    let [counter, setCounter] = useState(3);
    let navigateFunction = useNavigate();

    // 模拟ComponentDidMount
    useEffect(() => {
        // didMount
        let interval = setInterval(() => {
            setCounter(counter - 1)
        }, 1000);

        // willUnmount
        return () => {
            clearInterval(interval)
        }
    })

    // render
    return (
        <div>
            <h3> Black Sea </h3>
            <p>Nothing to sea [Sic] here </p>
            <p>Redirecting in {counter} seconds</p>
            {
                (counter < 1) ? (
                    navigateFunction('/')
                ) : null
            }
        </div>
    )
}
