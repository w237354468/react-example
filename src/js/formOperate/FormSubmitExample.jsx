import {Component} from "react";
import Field from "./Field";

class FormSubmitExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
                email: '',
                tel: ''
            },
            fieldErrors: {},
            data: []
        }
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        let hasError = [];
        // 提交前校验
        for (var k in this.state.fields) {
            const data = {}
            data['name'] = k
            data['value'] = this.state.fields[k]
            hasError.push(this.fieldValid(data))
        }
        // 如果错误没有清除
        if (hasError.filter(e => e === true).length > 0) {
            alert('提交失败')
            return;
        }
        // 没有错误，则更新列表，重置状态
        const newData = Object.assign({}, this.state.fields)
        const newDataList = [newData, ...this.state.data]
        this.setState({
            data: newDataList,
            fields: {
                name: '',
                email: '',
                tel: ''
            },
            fieldErrors: {}
        })
    }

    fieldValid = (data) => {
        let hasError = false;
        const fieldErrors = Object.assign({}, this.state.fieldErrors)

        if ('name' === data.name) {
            if (!data.value) {
                fieldErrors['name'] = '姓名不能为空';
                hasError = true;
            } else fieldErrors['name'] = ''
        }
        if ('email' === data.name) {
            if (!data.value) {
                fieldErrors['email'] = '邮箱不能为空';
                hasError = true;
            } else fieldErrors['email'] = ''
        }
        if ('tel' === data.name) {
            if (!data.value) {
                fieldErrors['tel'] = '电话不能为空';
                hasError = true;
            } else fieldErrors['tel'] = ''
        }
        this.setState({fieldErrors})
        return hasError;
    }

    /**
     * 封装为Field组件后的统一处理
     * @param evt
     */
    onFieldChange = ({name, value}) => {
        const fields = Object.assign({}, this.state.fields)
        fields[name] = value;
        this.setState({
            fields
        })
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <Field name={'name'}
                       value={this.state.fields.name}
                       placeHolder={"Name"}
                       onChange={this.onFieldChange}
                       validate={this.fieldValid}
                       errorMsg={this.state.fieldErrors['name']}>
                    <label>姓名： </label>
                </Field>
                <Field name={'email'}
                       value={this.state.fields.email}
                       placeHolder={"Email"}
                       onChange={this.onFieldChange}
                       validate={this.fieldValid}
                       errorMsg={this.state.fieldErrors['email']}>
                    <label>邮箱： </label>
                </Field>
                <Field name={'tel'}
                       value={this.state.fields.tel}
                       placeHolder={"Telephone"}
                       onChange={this.onFieldChange}
                       validate={this.fieldValid}
                       errorMsg={this.state.fieldErrors['tel']}>
                    <label>电话： </label>
                </Field>
                <input type='submit' value={'提交'}></input>
                <div>
                    <p>展示区</p>
                    <ul>
                        {this.state.data.map((v, index) => <li
                            key={index}>{v.name + ' -->  ' + v.email + ' -->  ' + v.tel}</li>)}
                    </ul>
                    <br/>
                </div>
            </form>
        )
    }
}

export default FormSubmitExample;