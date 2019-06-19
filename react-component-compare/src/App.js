import React, {useState, useEffect} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello",
    };

    componentDidMount() {
        console.log("Hello - Component Did Mount Done!");
        this.setState({title: "Big"});
        document.getElementById('hello').addEventListener('click', this.props.handleClick, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Hello - Component Did Update!");
    }

    componentWillUnmount() {
        console.log("Hello - Component will Unmount!");
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
    const {hello, count, handleClick} = props;
    const [title, setTitle] = useState("World");

    // useEffect 传递空数组，相当于 componentDidMount()
    useEffect(() => {
        console.log("World - Component Did Mount Done!");
        setTitle('React');
        document.getElementById('world').addEventListener('click', handleClick, false);

        return () => {
            document.getElementById('world').removeEventListener('click', handleClick, false);
        }
    }, []);

    // useEffect 不传递参数，它会在调用一个新的 effect 之前对前一个 effect 进行清理
    useEffect(() => {
        console.log("World - Component Did Update!");

        return () => {
            console.log("World - Component Will Unmount!");
        }
    });

    // useEffect 传递参数，相当于 componentDidUpdate 和 componentWillUnmount 组合
    useEffect(() => {
        console.log("Count - Component Did Update!");

        return () => {
            console.log("Count - Component Will Unmount!");
        }
    }, [count]);

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

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        const {hello, world, count} = this.state;

        return (
            <div>
                <Hello world={world} count={count} handleClick={this.handleClick}/>
                <World hello={hello} count={count} handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default App;
