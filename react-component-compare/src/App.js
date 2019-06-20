import React, {useState, useEffect} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello",
        num: 5
    };

    handleClick = () => {
        const {addCount} = this.props;
        addCount(this.state.num);
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
    }

    addCount($num = 1) {
        this.setState({count: this.state.count + $num});
    }

    subCount($num = 2) {
        this.setState({count: this.state.count - $num});
    }

    render() {
        const {hello, world, count} = this.state;

        return (
            <div>
                <Hello world={world} count={count} addCount={this.addCount}/>
                <World hello={hello} count={count} subCount={this.subCount}/>
            </div>
        );
    }
}

export default App;
