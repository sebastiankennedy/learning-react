import React, {Component, createContext} from 'react';
import './App.css';

const BatteryContext = createContext();
const OnLineContext = createContext();

class Leaf extends Component {
    render() {
        return (
            // 不能直接渲染其他组件，必须使用函数，函数的唯一参数就是 Context 的值
            <BatteryContext.Consumer>
                {
                    battery => (
                        <OnLineContext.Consumer>
                            {
                                online => <h1>Battery: {battery}, Online: {String(online)}</h1>
                            }
                        </OnLineContext.Consumer>
                    )
                }
            </BatteryContext.Consumer>
        );
    }
}


class Middle extends Component {
    render() {
        return <Leaf/>
    }
}

class App extends Component {
    state = {
        battery: 60,
        online: false
    };

    render() {
        const {battery, online} = this.state;

        return (
            <BatteryContext.Provider value={battery}>
                <OnLineContext.Provider value={online}>
                <button type="button" onClick={ () => this.setState({battery: battery-1}) }>Press</button>
                <button type="button" onClick={ () => this.setState({online: !online}) }>Switch</button>
                <Middle/>
                </OnLineContext.Provider>
            </BatteryContext.Provider>
        );
    }
}

export default App;
