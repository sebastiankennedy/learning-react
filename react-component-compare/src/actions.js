// 集中管理 Action
export function addCount(payload){
    return {
        type: 'addCount',
        payload,
    }
}

export function subCount(payload){
    return {
        type: 'subCount',
        payload
    }
}