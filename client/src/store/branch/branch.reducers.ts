import { FETCH_BRANCHES_START, FETCH_BRANCHES_SUCCESS, FETCH_BRANCHES_FAILURE, SET_BRANCH, BranchesActionTypes, Branch } from './branch.types';

export interface BranchState {
    branch: string
    branches: Branch[]
    isFetching: boolean,
    error: null | string
}

const initialState: BranchState = {
    branch: 'master',
    branches: [],
    isFetching: false,
    error: null
};

const branchReducer = (
    state = initialState,
    action: BranchesActionTypes
    ) => {
    switch (action.type) {
        case FETCH_BRANCHES_START:
            return { ...state, isFetching: true };
        case FETCH_BRANCHES_SUCCESS:
            return { ...state, isFetching: false, branches: action.payload ? action.payload : [], error: null };
        case FETCH_BRANCHES_FAILURE:
            return { ...state, isFetching: false, error: action.payload, branches: [] };
        case SET_BRANCH:
            return { ...state, branch: action.payload };
        default:
            return state;
    }
};

export default branchReducer;
