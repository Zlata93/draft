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

export const setBranch = (branch) => {
    return {
    type: branchTypes.SET_BRANCH,
    payload: branch
}};


export const fetchBranchesStartAsync = (repo) => {
    return async (dispatch) => {
        dispatch(fetchBranchesStart());

        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/branches`);
            const branches = await response.json();
            if (branches.output) {
                const branchArr = branches.output.filter(branch => branch);
                dispatch(fetchBranchesSuccess(branchArr));
            } else {
                dispatch(fetchBranchesFailure(branches.error));
            }
        } catch (e) {
            dispatch(fetchBranchesFailure(e));
        }
    }
};
