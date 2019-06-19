import React, {useState} from 'react';
import './App.css';

class Hello extends React.Component {
    state = {
        title: "Hello"
    };

    render() {
        const {title} = this.state;

        return (
            <h1>{title}</h1>
        );
    }
}

function World() {
    const [title, setTitle] = useState("World");

    return (
        <h1>{title}</h1>
    );
}


function App() {
    return (
        <div>
            <Hello/>
            <World/>
        </div>
    );
}

export default App;
