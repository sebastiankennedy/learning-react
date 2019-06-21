// 集中管理 Action
export function createAddCount(payload){
    return {
        type: 'addCount',
        payload,
    }
}

export function createSubCount(payload){
    return {
        type: 'subCount',
        payload
    }
}