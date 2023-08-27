import React from "react";
import TimerForm from "./TimerForm";

// 加号组件
class ToggleableTimerForm extends React.Component {

    state = {
        isOpen: false
    }

    // 属性初始化器
    handleFormOpen = () => {
        this.setState({
            isOpen: true
        })
    }

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer); // 先调用上层组件，加入到timer列表中，再设置状态为关闭
        this.setState({
            isOpen: false
        })
    }

    handleFormClose = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        if (this.state.isOpen) {
            return (<TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            )
        } else {
            return (
                <div>
                    <button onClick={this.handleFormOpen}>
                        +
                    </button>
                </div>
            )
        }
    }
}

export default ToggleableTimerForm;