const reducers = {
    todos(state, action) {
        const { type, payload } = action;

        switch (type) {
            case 'set':
                return payload
            case 'add':
                return [...state, payload]
            case 'remove':
                return state.filter(todo => {
                    return todo.id !== payload
                })
            case 'toggle':
                return state.map(todo => {
                    return todo.id === payload
                        ? {
                            ...todo,
                            complete: !todo.complete
                        }
                        : todo
                })
            default:
                return state
        }
    },
    incrementCount(state, action) {
        const { type } = action

        switch (type) {
            case 'set':
            case 'add':
                return state + 1;
            default:
                return state;
        }
    }
}

function combineReducers(reducers) {
    const changed = {}
    // state 代表全局状态
    return function reducer(state, action) {
        for (let key in reducers) {
            // 根据数据字段进行单独更新
            changed[key] = reducers[key](state[key], action);
        }

        return {
            ...state,
            ...changed
        }
    }
}

export default combineReducers(reducers);