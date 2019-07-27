import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({todoList, onTodoClick}) => (
    <ul>
        {todoList.map((todo, index) => (
            <Todo key={index} {...todo} onClick={() => onTodoClick(index)}/>
        ))}
    </ul>
)

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList