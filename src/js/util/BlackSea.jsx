import {Component} from "react";
import MyRedirect from "../myRouter/MyRedirect";

class BlackSea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 3
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => {
                return {
                    counter: prevState.counter - 1
                }
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                <h3> Black Sea </h3>
                <p>Nothing to sea [Sic] here </p>
                <p>Redirecting in {this.state.counter} seconds</p>
                {
                    (this.state.counter < 1) ? (
                        <MyRedirect to='/'/>
                    ) : null
                }
            </div>
        )
    }
}

export default BlackSea