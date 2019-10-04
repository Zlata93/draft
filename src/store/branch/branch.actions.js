import branchTypes from './branch.types';

export const fetchBranchesStart = () => ({
    type: branchTypes.FETCH_BRANCHES_START,
});

export const fetchBranchesSuccess = (branches) => ({
    type: branchTypes.FETCH_BRANCHES_SUCCESS,
    payload: branches
});

export const fetchBranchesFailure = (error) => ({
    type: branchTypes.FETCH_BRANCHES_FAILURE,
    payload: error
});

export const setBranch = (branch) => ({
    type: branchTypes.SET_BRANCH,
    payload: branch
});


export const fetchBranchesStartAsync = (repo) => {
    return async (dispatch) => {
        dispatch(fetchBranchesStart());

        try {
            console.log(`api/repos/${repo}/branches`)
            const response = await fetch(`api/repos/${repo}/branches`);
            const branches = await response.json();
            dispatch(fetchBranchesSuccess(branches));
        } catch (e) {
            dispatch(fetchBranchesFailure(e));
        }
    }
};
