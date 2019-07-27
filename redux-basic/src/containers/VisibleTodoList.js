import {connect} from "react-redux";
import {toggleTodo} from "../actions";
import TodoList from "../components/TodoList";

const getVisibleTodoList = (todoList, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todoList.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todoList.filter(t => !t.completed);
        case 'SHOW_ALL':
        default:
            return todoList;
    }
}

const mapStateToProps = state => {
    return {
        todoList: getVisibleTodoList(state.todoList, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id));
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList