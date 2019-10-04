import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reposReducer from './repos/repos.reducers';
import filesReducer from './files/files.reducers';
import branchReducer from './branch/branch.reducers';

const rootReducer = combineReducers({
    repos: reposReducer,
    files: filesReducer,
    branch: branchReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
