import React from 'react';
import './App.css';

class Hello extends React.Component {
    render() {
        return (
            <h1>Hello</h1>
        );
    }
}

function World() {
    return (
        <h1>World</h1>
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
