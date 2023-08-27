import React from "react";
import EditableTimer from "./EditableTimer";

class EditableTimerList extends React.Component {

    render() {

        const timers = this.props.timers.map(timer => {
            return (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                    onFormSubmit={this.props.onFormSubmit}
                    onFormDelete={this.props.onFormDelete}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            )
        })

        return (
            <div>
                {timers}
            </div>
        );
    } // editFormOpen 是否打开修改状态
}

export default EditableTimerList;