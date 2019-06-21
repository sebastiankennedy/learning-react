// 让每个 State 独立接收 Action，并且计算更新对应的 State
const reducers = {
    count(state, action) {
        const {type, payload} = action;

        switch (type) {
            case 'addCount':
                return state + payload
            case 'subCount':
                return state - payload
        }

        return state;
    }
}

// 构建一个新的 Reducer 函数
function combineReducers(reducers) {
    return function reducer(state, action) {
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