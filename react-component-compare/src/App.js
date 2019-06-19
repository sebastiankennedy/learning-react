import React, {useState} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello"
    };

    render() {
        const {title} = this.state;
        const {world} = this.props;

        return (
            <h1>{title} {world}</h1>
        );
    }
}

function World(props) {
    const [title, setTitle] = useState("World");
    const {hello} = props;

    return (
        <h1>{hello} {title}</h1>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hello: "Hello",
            world: "World"
        }
    }

    render() {
        const {hello, world} = this.state;

        return (
            <div>
                <Hello world={world}/>
                <World hello={hello}/>
            </div>
        );
    }
}

export default App;
