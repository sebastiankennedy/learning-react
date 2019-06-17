import React, {Component, useState, useEffect} from 'react';

class App2 extends Component {
    state = {
        count: 0,
        size: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    };

    onResize = () => {
        this.setState({
            size: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        })
    };

    componentDidMount() {
        document.title = this.state.count;

        window.addEventListener('resize', this.onResize, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.title = this.state.count;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    render() {
        const {count, size} = this.state;

        return (
            <button type="button"
                    onClick={() => {
                        this.setState({count: this.state.count + 1})
                    }}
            >
                Click ({count})
                Size: {size.width}X{size.height}
            </button>
        );
    }
}

function App() {
    const [count, setCount] = useState(0);
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    };

    useEffect(() => {
        document.title = count;
    });

    // 传递空数组，可以避免每次渲染后执行。如果数组每一项数值不变，只会渲染一次。
    useEffect( () => {
        window.addEventListener('resize', onResize, false);

        return () => {
            window.removeEventListener('resize', this.onResize, false);
        }
    }, []);

    return (
        <button
            type="button"
            onClick={() => {
                setCount(count + 1);
            }}
        >
            Click ({count})
            Size: {size.width}X{size.height}
        </button>
    );
}

export default App;
