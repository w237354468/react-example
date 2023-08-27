// 声明组件的方法有两种
// 1. 作为ES6类（如下）
// 2，导入并使用createReactClass方法
import React from "react";
import {products} from "./seed";
import Product from "./Product";
import PropTypes from "prop-types";
import Heading from "./Heading";
import {exampleContext} from './ExampleContext.js';

class ProductList extends React.Component {

    // 组件将验证这些变量是否是对应的类型
    static propTypes = {
        counter: PropTypes.arrayOf(PropTypes.string)
    }

    // 使用静态属性defaultProps 给props指定默认值
    static defaultProps = {
        counter: ["this is default value"]
    }

    constructor(props) {
        super(props);
        console.log('获取到prop的默认值(未传入):' + this.props.counter)
        this.state = {
            pros: []
        } // 只有构造器里面可以直接赋值

        this.handleChildComponentWillingPropsChange = this.handleChildComponentWillingPropsChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            pros: products,
            testInfo: {
                num: 3,
                count: 4
            }
        }); // 除了构造器都是用这个setState方法修改状态， 同时要将状态视为不可变
    }

    handleChildComponentWillingPropsChange(productId) {
        console.log('点击后向上传递的Product id是: ' + productId);
        const newVoteInfo = this.state.pros.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    vote: ++product.vote
                })
            } else {
                return product;
            }
        })
        this.setState({
            pros: newVoteInfo
        })
    }

    // render方法是react组件唯一必须的方法，通过该方法的返回值来确定要渲染到页面的内容
    render() {

        console.log("invoke Product Childern Component Render");
        const productComponent = this.state.pros
            .sort((a, b) => {
                return b.vote - a.vote;
            })
            .map((product) => {
                return <Product key={'product-' + product.id} // 特殊属性，为Product每个实例创建唯一绑定
                                id={product.id}
                                vote={product.vote}
                                title={product.title}
                                desc={product.description}
                                url={product.url}
                                obj={this.state.testInfo}
                                oncalling={this.handleChildComponentWillingPropsChange}
                />
            })

        return (
            <div className='ui unstackable items'>
                <Heading/>
                {/*传递数据给子组件*/}
                <exampleContext.Provider value={{ccc: "在ProductList里设置的context"}}>
                    {productComponent.map((item) => (
                        <div key={item.key}>
                            {item}
                        </div>
                    ))}
                </exampleContext.Provider>
            </div>
        )
    }
}

export default ProductList;
