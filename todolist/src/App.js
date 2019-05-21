import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: new Date().toDateString(),
                    body: 'Hello World, React.'
                }
            ],
            bodyInputValue: ''
        };
    }

    handleAddButton = () => {
        this.setState({
            list: [
                ...this.state.list,
                {
                    id: new Date().toDateString(),
                    body: this.state.bodyInputValue
                }
            ],
            bodyInputValue: ''
        });
    }

    handleInputChange = (event) => {
        this.setState({
            bodyInputValue: event.target.value
        })
    }

    handleItemClick = (key) => {
        const list = [...this.state.list];
        list.splice(key, 1);
        this.setState({list})
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div>
                    <div>
                        <input id="body"
                               type="text"
                               value={this.state.bodyInputValue}
                               onChange={this.handleInputChange}/>
                        <button onClick={this.handleAddButton}>Add</button>
                    </div>
                    <div>
                        <ul>
                            {
                                this.state.list.map((item, key) => {
                                    return <li key={key} onClick={this.handleItemClick.bind(this, key)}>{item.id} - {item.body}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
