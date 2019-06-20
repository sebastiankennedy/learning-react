import React, {useState, useEffect} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello",
    };

    render() {
        const {world, count, addCount} = this.props;
        const {title} = this.state;

        return (
            <h1 id="hello" onClick={addCount}>{title} {world} - {count}</h1>
        );
    }
}

function World(props) {
    const {hello, count, subCount} = props;
    const [title, setTitle] = useState("World");

    return (
        <h1 id="world" onClick={subCount}>{hello} {title} - {count}</h1>
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

    addCount() {
        this.setState({count: this.state.count + 1});
    }

    subCount() {
        this.setState({count: this.state.count - 1});
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
