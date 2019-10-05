import branchTypes from './branch.types';

const initialState = {
    branch: 'master',
    isFetching: false,
    branches: [],
    error: null
};

const branchReducer = (state = initialState, { type, payload }) => {
    console.log(type)
    switch (type) {
        case branchTypes.FETCH_BRANCHES_START:
            return { ...state, isFetching: true };
        case branchTypes.FETCH_BRANCHES_SUCCESS:
            return { ...state, isFetching: false, branches: payload ? payload : [], error: null };
        case branchTypes.FETCH_BRANCHES_FAILURE:
            return { ...state, isFetching: false, error: payload, branches: [] };
        case branchTypes.SET_BRANCH:
            return { ...state, branch: payload };
        default:
            return state;
    }
};

export default branchReducer;
