import React, {useState, useEffect} from 'react';
import {addCount, subCount} from "./actions";
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello",
        num: 5
    };

    handleClick = () => {
        const {dispatch} = this.props;
        dispatch(addCount(10));
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
    const {hello, count, dispatch} = props;
    const [title, setTitle] = useState("World");

    const handleClick = () => {
        dispatch(subCount(5))
    }

    useEffect(() => {
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
    }

    addCount($num = 1) {
        this.setState({count: this.state.count + $num});
    }

    subCount($num = 1) {
        this.setState({count: this.state.count - $num});
    }

    // 创建一个调度器，把需要执行的操作都集中管理，操作带有类型和数据两个参数
    dispatch(action) {
        const {type, payload} = action;

        switch (type) {
            case "addCount":
                this.addCount(payload);
                break;
            case "subCount":
                this.subCount(payload);
                break;
        }
    }

    render() {
        const {hello, world, count} = this.state;

        return (
            <div>
                <Hello world={world} count={count} dispatch={this.dispatch}/>
                <World hello={hello} count={count} dispatch={this.dispatch}/>
            </div>
        );
    }
}

export default App;
