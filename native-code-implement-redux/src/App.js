import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { createAdd, createRemove, createToggle, createSet } from './actions'
import reducer from './reducers'
import './App.css';

const Control = memo(function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();

    if (!newText) {
      return;
    }

    addTodo({
      id: Date.now(),
      text: newText,
      complete: false
    })

    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>
        todos
      </h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="Add Todo"
          ref={inputRef}
        />
      </form>
    </div>
  )
})

function Todos(props) {
  const { removeTodo, toggleTodo, todos } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return (<TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />)
        })
      }
    </ul>
  )
}

function TodoItem(props) {
  const { todo: {
    id,
    text,
    complete
  },
    removeTodo,
    toggleTodo
  } = props

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  // 当函数作为属性传入进子组件当中，需要使用 useCallback() 函数包裹
  const dispatch = useCallback((action) => {
    const state = {
      todos,
      incrementCount
    }

    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    const newState = reducer(state, action)

    for (let key in newState) {
      setters[key](newState[key]);
    }

  }, [todos, incrementCount])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('TODO_LIST') || '[]')
    dispatch(createSet(todos))
  }, []);

  useEffect(() => {
    localStorage.setItem('TODO_LIST', JSON.stringify(todos))
  }, [todos])

  let result = bindActionCreators({
    removeTodo: createRemove,
    toggleTodo: createToggle
  }, dispatch)

  return (
    <div className="App">
      <Control
        {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
        }
      />
      <Todos
        removeTodo={result.removeTodo}
        toggleTodo={result.toggleTodo}
        todos={todos}
      />
    </div>
  );
}

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

export default App;
