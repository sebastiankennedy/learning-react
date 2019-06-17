import React, {Component, useState, useMemo, memo, useCallback} from 'react';

const Counter = memo(function Counter(props) {
    console.log('Counter render');

    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    );
});

function App(props) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    // 传入空数组，只会运行一次；传入参数变化时，才会运行一次；
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    // useMemo( () => fn ) === useCallback(fn)
    const onClick = useCallback(() => {
        console.log('click');
        setClickCount(clickCount + 1);
    }, [],);

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
