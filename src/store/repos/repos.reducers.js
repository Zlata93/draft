import reposTypes from './repos.types';

const initialState = {
    repos: [],
    isFetching: false,
    error: null
};

const reposReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case reposTypes.FETCH_REPOS_START:
            return { ...state, isFetching: true };
        case reposTypes.FETCH_REPOS_SUCCESS:
            return { ...state, isFetching: false, repos: payload };
        case reposTypes.FETCH_REPOS_FAILURE:
            return { ...state, isFetching: false, error: payload };
        default:
            return state;
    }
};

export default reposReducer;
