import React from "react";

class TimerActionButton extends React.Component {

    handleStartButtonClick = () => {
        this.props.onStartClick(this.props.id);
    }

    handleStopButtonClick = () => {
        console.log(this.props.id)
        this.props.onStopClick(this.props.id)
    }

    render() {
        if (this.props.timerIsRunning) {
            return (
                <div>
                    <span
                        onClick={this.handleStartButtonClick}>
                        <p>Start</p>
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    <span
                        onClick={this.handleStopButtonClick}>
                        <p>Stop</p>
                    </span>
                </div>
            )
        }
        ;
    }
}

export default TimerActionButton;