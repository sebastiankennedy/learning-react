const reducers = {
    todos(state, action) {
        const {type, payload} = action;

        switch (type) {
            case 'set':
                return payload;
            case 'add':
                return [...state, payload];
            case 'remove':
                return state.filter(todo => {
                    return todo.id !== payload
                })
            case 'toggle':
                return state.map(todo => {
                    return todo.id === payload
                        ? {...todo, complete: !todo.complete}
                        : todo;
                })
        }
    },
    incrementCount(state, action) {
        const {type, payload} = action;

        switch (type) {
            case 'set':
            case 'add':
                return state + 1;
        }

        return state;
    }
};

function combineReducers(reducers){
    // 定义全局 Reducer，参数 state 是全局的 state
    return function reducer(state, action){
        const changed = {};

        for (let key in reducers) {
            changed[key] = reducers[key](state[key], action);
        }

        return {
            ...state,
            ...changed
        }
    }
}

export default combineReducers(reducers);
