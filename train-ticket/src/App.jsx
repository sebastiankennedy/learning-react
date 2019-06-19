import React, {useState, useCallback, useRef, useEffect} from 'react';
import {createSet, createAdd, createRemove, createToggle} from './actions'
import './App.css';
import reducer from './reducers'

let idSeq = Date.now();

function bindActionCreators(actionCreators, dispatch) {
    const result = {};

    for (let key in actionCreators) {
        result[key] = function (...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        }
    }

    return result;
}

function Control(props) {
    const {addTodo} = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const newText = inputRef.current.value.trim();
        if (newText.length === 0) {
            return;
        }

        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
        });

        inputRef.current.value = '';
    }

    return (
        <div className="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input type="text"
                       className="new-todo"
                       placeholder="What needs to be done?"
                       ref={inputRef}
                />
            </form>
        </div>
    );
}

function TodoItem(props) {
    const {
        todo: {
            id,
            text,
            complete
        },
        removeTodo,
        toggleTodo,
    } = props;

    const onChange = () => {
        toggleTodo(id);
    };

    const onRemove = () => {
        removeTodo(id);
    };

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={complete}
                onChange={onChange}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    );
}

function Todos(props) {
    const {todos, removeTodo, toggleTodo, dispatch} = props;
    return (
        <ul>
            {
                todos.map(todo => {
                    return <TodoItem
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        dispatch={dispatch}
                    />
                })
            }
        </ul>
    );
}

const LS_KEY = '_todos_';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [incrementCount, setIncrementCount] = useState(0);

    const dispatch = useCallback((action) => {
        const state = {
            todos,
            incrementCount
        };

        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount
        };

        const newState = reducer(state, action);
        for (let key in newState) {
            setters[key](newState[key]);
        }

        /*actions.reduce(function(lastTodos, action){
            return [...lastTodos, action.payload]
        }, todos);*/

    }, [todos, incrementCount]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY || setTodos(todos)));
        dispatch(createSet(todos));
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="todo-list">
            <Control
                {
                    ...bindActionCreators({
                        addTodo: createAdd
                    }, dispatch)
                }
            />
            <Todos
                {
                    ...bindActionCreators({
                        removeTodo: createRemove,
                        toggleTodo: createToggle,
                    }, dispatch)
                }
                todos={todos}
            />
        </div>
    );
}

export default TodoList;
