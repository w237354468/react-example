import React from "react";
import TimerActionButton from "./TimerActionButton";

// 展示倒计时的组件
class Timer extends React.Component {

    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval)
    }

    handleDeleteClick = (e) => {
        this.props.onDeleteClick(this.props.id)
    }

    render() {

        const elapsedString = this.renderElapsedString(this.props.elapsed, this.props.runningSince);
        const buttonStatus = !this.props.runningSince;

        // 标题，项目，时间，按钮X2，Start文本
        return (<div>
            <hr/>
            <div>
                <div>
                    {this.props.title}
                </div>
                <div>
                    {this.props.project}
                </div>
                <div>
                    <h3>{elapsedString}</h3>
                </div>
                <div>
                        <span
                            onClick={this.props.onEditClick}>
                                    <p>edit</p>
                        </span>
                    <span
                        onClick={this.handleDeleteClick}>
                                    <p>delete</p>
                        </span>
                </div>
                <div>
                    <TimerActionButton
                        id={this.props.id}
                        timerIsRunning={buttonStatus}
                        onStartClick={this.props.onStartClick}
                        onStopClick={this.props.onStopClick}
                    />
                </div>
            </div>
            <hr/>
        </div>)
    }

    renderElapsedString(elapsed, runningSince) {
        let totalElapsed = elapsed;
        if (runningSince) {
            totalElapsed += Date.now() - runningSince;
        }
        return this.millisecondsToHuman(totalElapsed);
    }

    millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        return [
            this.pad(hours.toString(), 2),
            this.pad(minutes.toString(), 2),
            this.pad(seconds.toString(), 2),
        ].join(':');
    }

    pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }
}

export default Timer;