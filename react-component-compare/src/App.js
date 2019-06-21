import React, {useState, useEffect} from 'react';
import {createAddCount, createSubCount} from "./actions";
import './App.css';

// 封装 Dispatch 和 Action，把一个 Action 封装成一个可调用的匿名函数
function bindActionCreators(actionCreators, dispatch) {
    const result = {};

    for (let key in actionCreators) {
        result[key] = function (...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        }
    }
    return result;
}

class Hello extends React.Component {
    state = {
        title: "Hello",
        num: 5
    };

    handleClick = () => {
        const {addCount} = this.props;
        addCount(5);
    }

    componentDidMount() {
        document.getElementById('hello').addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.getElementById('hello').removeEventListener('click', this.handleClick, false);
    }

    render() {
        const {world, count} = this.props;
        const {title} = this.state;

        return (
            <h1 id="hello">{title} {world} - {count}</h1>
        );
    }
}

function World(props) {
    const {hello, count, subCount} = props;
    const [title, setTitle] = useState("World");

    const handleClick = () => {
        subCount(5);
    }

    useEffect(() => {
        setTitle("Sebastian");
        document.getElementById('world').addEventListener('click', handleClick, false);
        return () => {
            document.getElementById('world').removeEventListener('click', handleClick, false);
        };
    }, []);


    return (
        <h1 id="world">{hello} {title} - {count}</h1>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hello: "Hello",
            world: "World",
            count: 10
        }

        this.addCount = this.addCount.bind(this);
        this.subCount = this.subCount.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.reducer = this.reducer.bind(this);
        this.setCount = this.setCount.bind(this);
    }

    addCount($num = 1) {
        this.setState({count: this.state.count + $num});
    }

    subCount($num = 1) {
        this.setState({count: this.state.count - $num});
    }

    // reducer 封装每个 Action 对应的 State，返回通过 Action 更新之后的 State
    reducer(state, action) {
        const {type, payload} = action;
        const {count} = state;

        switch (type) {
            case "addCount":
                return {
                    ...state,
                    count: count + payload
                };
            case "subCount":
                return {
                    ...state,
                    count: count - payload
                };
        }

        return state;
    }

    // 创建一个 Dispatch，把需要执行的 Action 都集中管理，一个 Action 关联对应的业务逻辑
    dispatch(action) {
        const state = {
            count: this.state.count
        }

        const setters = {
            count: this.setCount
        }

        const newState = this.reducer(state, action);
        console.log(newState);
        for (let key in  newState) {
            setters[key](newState[key]);
        }
    }

    setCount(num) {
        this.setState({count: num});
    }

    render() {
        const {hello, world, count} = this.state;

        return (
            <div>
                <Hello world={world}
                       count={count}
                       dispatch={this.dispatch}
                       {
                           // 根据组件按需加载需要绑定的 Action
                           ...bindActionCreators({
                               addCount: createAddCount
                           }, this.dispatch)
                       }
                />
                <World hello={hello}
                       count={count}
                       dispatch={this.dispatch}
                       {
                           // 根据组件按需加载需要绑定的 Action
                           ...bindActionCreators({
                               subCount: createSubCount
                           }, this.dispatch)
                       }
                />
            </div>
        );
    }
}

export default App;
