import { FETCH_COMMITS_START, FETCH_COMMITS_SUCCESS, FETCH_COMMITS_FAILURE, CommitsActionTypes } from './commits.types';

export interface CommitsState {
    commits: string[],
    isFetching: boolean,
    error: null | string
}

const initialState: CommitsState = {
    commits: [],
    isFetching: false,
    error: null
};

const commitsReducer = (
    state = initialState, 
    action: CommitsActionTypes
    ) => {
    switch (action.type) {
        case FETCH_COMMITS_START:
            return { ...state, isFetching: true };
        case FETCH_COMMITS_SUCCESS:
            return { ...state, isFetching: false, commits: action.payload ? action.payload : [], error: null };
        case FETCH_COMMITS_FAILURE:
            return { ...state, isFetching: false, error: action.payload, commits: [] };
        default:
            return state;
    }
};

export default commitsReducer;
