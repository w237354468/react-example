import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
import * as uuid from "uuid";

class TimersDashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timers: [{
                title: 'Practice squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 8986300,
                runningSince: Date.now()
            }, {
                title: 'Bake squat',
                project: 'Kitchen Chores',
                id: uuid.v4(),
                elapsed: 1273998,
                runningSince: null
            }]
        }
    }

    handleDeleteFormSubmit = (timerId) => {
        this.deleteTimer(timerId);
    }

    handleEditFormSubmit = (timer) => {
        this.updateTimer(timer)
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    }

    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    }

    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    }

    createTimer = (timer) => {
        this.setState({
            timers: this.state.timers.concat({
                title: timer.title,
                project: timer.project,
                id: uuid.v4(),
                elapsed: 1283012,
                runningSince: Date.now()
            })
        })
    }

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project
                    });
                } else {
                    return timer;
                }
            })
        })
    }

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(timer => {
                return timer.id !== timerId;
            })
        })
    }

    startTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince:now
                    });
                } else {
                    return timer;
                }
            }),
        });
    }

    stopTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince;
                    console.log(timerId)
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                } else {
                    return timer;
                }
            }),
        });
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div>
                    <EditableTimerList
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                        onFormDelete={this.handleDeleteFormSubmit}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                    />
                    <ToggleableTimerForm
                        isOpen={false}
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default TimersDashBoard;