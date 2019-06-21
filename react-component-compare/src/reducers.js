// 让每个 State 独立接收 Action，并且计算更新对应的 State
function reducers(){

}

function combineReducers(reducers){
    return function reducer(state, action){
        const changed = {};

        for (let key in reducers){
            changed[key] = reducers[key](state[key], action);
        }

        return {
            ...state,
            ...changed
        }
    }
}

export default combineReducers(reducers);