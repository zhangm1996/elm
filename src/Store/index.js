import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import promiseMiddleware from 'redux-promise'
import tabbarReducer from './Reducers/tabbarReducer'
import hotReducer from './Reducers/hotReducer'
import listReducer from './Reducers/listReducer'

import thunk from 'redux-thunk'
//reducer
// vuex mutation (唯一修改状态的地方)

var reducer = combineReducers({
    tabbarReducer,
    hotReducer,
    listReducer
})

//reducer 返回值是什么 store 存储的状态就会被修改成什么值。



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
   applyMiddleware(thunk,promiseMiddleware)
 ));

export default store;
