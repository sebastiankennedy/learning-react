import React, { Component, lazy, Suspense } from 'react';
import './App.css';

// 需要传入一个没有参数的函数，返回一个 React 组件
const About = lazy( ()=> import('./about.jsx'));

class App extends Component {
    state = {
        hasError: false
    };

    // 捕获任何渲染错误
    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError){
            return <div>error</div>;
        }
        return (
            <div>
                {/* fallback 需要传入组件实例 */}
                <Suspense fallback={<div>Loading</div>}>
                <About></About>
                </Suspense>
            </div>
        );
    }
}

export default App;
