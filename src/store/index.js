import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reposReducer from './repos/repos.reducers';

const rootReducer = combineReducers({
    repos: reposReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
