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