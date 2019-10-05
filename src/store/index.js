import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import commitsReducer from './commits/commits.reducers';
import branchReducer from './branch/branch.reducers';
import reposReducer from './repos/repos.reducers';
import filesReducer from './files/files.reducers';
import fileReducer from './file/file.reducers';

const rootReducer = combineReducers({
    file: fileReducer,
    repos: reposReducer,
    files: filesReducer,
    branch: branchReducer,
    commits: commitsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
