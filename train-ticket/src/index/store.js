import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk'

export default createStore(
    combineReducers(reducers),
    {
        // 始发城市
        from: '北京',
        // 终点城市
        to: '上海',
        // 城市选择器
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        // 需要异步按需加载
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        highSpeed: false
    },
    applyMiddleware(thunk)
)