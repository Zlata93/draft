import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reposReducer from './repos/repos.reducers';
import branchReducer from './branch/branch.reducers';

const rootReducer = combineReducers({
    repos: reposReducer,
    branch: branchReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
