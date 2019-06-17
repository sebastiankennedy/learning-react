import React, { Component, memo } from 'react';
import './App.css';

const Foo = memo(function Foo(props) {
    // 监视 Foo 组件渲染情况
    console.log('Foo render');
    return <div>{props.person.age}</div>;
});

class App extends Component {
    state = {
        count: 0,
        person: {
            age: 1,
        }
    };
    render() {
        const person = this.state.person;
        return (
            <div>
                <button onClick={ () => {
                    person.age++;
                    this.setState({ person })
                }}>Add</button>
                <Foo person={person} />
            </div>
        );
    }
}

export default App;
