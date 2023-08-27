// 父组件可以他弄故宫props把属性传递给自组件
import React from "react";
import {exampleContext} from './ExampleContext.js';

class Product extends React.Component {

    // 子组件读取props后无法修改对应的值
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
        this.handleClick = this.handleClick.bind(this);
        // 只有react自带的特殊方法会将this绑定到当前组件，使用这个语句，就可以将handleClick里的this也绑定到当前组件（而不是JS中的当前文件）
        // 此方法在18版本中是否生效需查看，目前看好像没啥用
    }

    componentDidMount() {
        console.log('componentDidMount => <Product/>')
    }

    handleClick = () => {
        this.props.oncalling(this.props.id); // 调用父类的方法，向上传递
    }

    render() {
        let name = 'wzq';
        return (
            <exampleContext.Consumer>
                {contextValue =>
                    <div>
                        {this.props.obj.num}
                        {this.props.id + ' ' + name}
                        <p>{contextValue.ccc}</p>
                        <div>
                            vote: {this.props.vote}
                        </div>
                        <div onClick={this.handleClick}>
                            title : {this.props.title}
                        </div>
                        <div>
                            url : {this.props.url}
                        </div>
                        <br/>
                    </div>
                }
            </exampleContext.Consumer>
        )
    }
}

export default Product;