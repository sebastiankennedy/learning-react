// Action 是把所有业务操作集中管理起来
export function createAddCount(payload) {
    return {
        type: 'addCount',
        payload,
    }
}

export function createSubCount(payload) {
    return {
        type: 'subCount',
        payload
    }
}