import React, { Component, PureComponent, memo } from 'react';
import './App.css';

// PureComponent 提供了简单的对比算法，来避免组件重新渲染，节省开销
class Foo extends PureComponent{
    // shouldComponentUpdate 实现效果与 PureComponent 一致
    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.name === this.props.name){
            return false;
        }

        return true;
    }*/

    render() {
        // 监视 Foo 组件渲染情况
        console.log('Foo render');
        return null;
    }
}

class App extends Component {
    state = {
        count: 0
    };
    render() {
        return (
            <div>
                <button onClick={ () => this.setState({ count: this.state.count + 1})}>add</button>
                <Foo name="Mike"/>
            </div>
        );
    }
}

export default App;
