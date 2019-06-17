import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react';

class Counter extends React.PureComponent{
    speak(){
        console.log(`now counter is: ${this.props.count}`);
    }
    render(){
        const {props} = this;
        return (
            <h1 onClick={props.onClick}>{props.count}</h1>
        );
    }
}

function App(props) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const counterRef = useRef();
    const it = useRef();

    // 传入空数组，只会运行一次；传入参数变化时，才会运行一次；
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    // useMemo( () => fn ) === useCallback(fn)
    const onClick = useCallback(() => {
        console.log('click');
        setClickCount(clickCount + 1);

        counterRef.current.speak();
    }, [],);

    /* 不会停止，每次 App 重新渲染都会重新声明 it
    useEffect(() => {
        it = setInterval( () => {
            setCount(count => count + 1);
        }, 1000)
    }, []);

    useEffect( () => {
       if (count >= 10) {
           clearInterval(it);
       }
    });*/
    useEffect(() => {
        it.current = setInterval( () => {
            setCount(count => count + 1);
        }, 1000)
    }, []);

    useEffect( () => {
        if (count >= 10) {
            clearInterval(it.current);
        }
    });

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    setCount(count + 1)
                }}
            >
                Click ({count})，Double:({double})
            </button>
            <Counter count={double} onClick={onClick}/>
        </div>
    );
}

export default App;
