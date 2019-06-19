import React, {useState, useEffect} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello",
    };

    componentDidMount() {
        this.setState({title: "Big"})
    }

    render() {
        const {world, count} = this.props;
        const {title} = this.state;

        return (
            <h1>{title} {world} - {count}</h1>
        );
    }
}

function World(props) {
    const {hello, count} = props;
    const [title, setTitle] = useState("World");

    // useEffect 传递空数组，相当于 componentDidMount()
    useEffect(() => {
        setTitle('React');
    }, []);

    return (
        <h1>{hello} {title} - {count}</h1>
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
    }

    render() {
        const {hello, world, count} = this.state;

        return (
            <div>
                <Hello world={world} count={count}/>
                <World hello={hello} count={count}/>
            </div>
        );
    }
}

export default App;
