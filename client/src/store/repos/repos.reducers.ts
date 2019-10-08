import { FETCH_REPOS_START, FETCH_REPOS_SUCCESS, FETCH_REPOS_FAILURE, SET_REPO, ReposActionTypes } from './repos.types';

export interface reposState {
    repo: string
    repos: string[]
    isFetching: boolean,
    error: null | string
}

const initialState: reposState = {
    repo: '',
    repos: ['test_repo'],
    isFetching: false,
    error: null
};

const reposReducer = (
    state = initialState,
    action: ReposActionTypes
) => {
    switch (action.type) {
        case FETCH_REPOS_START:
            return { ...state, isFetching: true };
        case FETCH_REPOS_SUCCESS:
            return { ...state, isFetching: false, repos: action.payload };
        case FETCH_REPOS_FAILURE:
            return { ...state, isFetching: false, error: action.payload };
        case SET_REPO:
            return { ...state, repo: action.payload };
        default:
            return state;
    }
};

export default reposReducer;
