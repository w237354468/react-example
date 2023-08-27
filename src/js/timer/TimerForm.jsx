import React from "react";

// 编辑Timer的组件，一个输入框，一个更新/创建按钮，一个删除按钮
class TimerForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        title: this.props.title || '',
        project: this.props.project || ''
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    handleProjectChange = (e) => {
        this.setState({project: e.target.value})
    }

    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        })
    }

    render() {
        const submitText = this.props.id ? "Update" : "Create";
        return (
            <div>
                <hr/>
                <div>
                    <label>Title</label>
                    <input type='text' value={this.state.title} onChange={this.handleTitleChange}/>
                </div>
                <div>
                    <label>Project</label>
                    <input type='text' value={this.state.project} onChange={this.handleProjectChange}/>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>
                        {submitText}
                    </button>
                    <button onClick={this.props.onFormClose}>
                        Cancel
                    </button>
                </div>
                <hr/>

            </div>
        );
    }
}

export default TimerForm;