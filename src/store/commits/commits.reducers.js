import commitsTypes from './commits.types';

const initialState = {
    commits: [],
    isFetching: false,
    error: null
};

const commitsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case commitsTypes.FETCH_COMMITS_START:
            return { ...state, isFetching: true };
        case commitsTypes.FETCH_COMMITS_SUCCESS:
            return { ...state, isFetching: false, commits: payload ? payload : [], error: null };
        case commitsTypes.FETCH_COMMITS_FAILURE:
            return { ...state, isFetching: false, error: payload, commits: [] };
        default:
            return state;
    }
};

export default commitsReducer;