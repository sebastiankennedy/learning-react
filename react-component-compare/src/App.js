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
            document.getElementById('world').removeEventListener('click', this.handleClick, false);
        }
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
