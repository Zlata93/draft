import { Action } from 'redux';
import { AppState } from "../index";
import { ThunkAction } from 'redux-thunk';
import { FETCH_BRANCHES_START, FETCH_BRANCHES_SUCCESS, FETCH_BRANCHES_FAILURE, SET_BRANCH, BranchesActionTypes, Branch } from './branch.types';

export const fetchBranchesStart = ():BranchesActionTypes => ({
    type: FETCH_BRANCHES_START,
});

export const fetchBranchesSuccess = (branches: Branch[]):BranchesActionTypes => ({
    type: FETCH_BRANCHES_SUCCESS,
    payload: branches
});

export const fetchBranchesFailure = (error: string):BranchesActionTypes => ({
    type: FETCH_BRANCHES_FAILURE,
    payload: error
});

export const setBranch = (branch: string):BranchesActionTypes => {
    return {
    type: SET_BRANCH,
    payload: branch
}};


export const fetchBranchesStartAsync = (
    repo: string
):ThunkAction<void, AppState, null, Action<string>> => {
    return async (dispatch) => {
        dispatch(fetchBranchesStart());
        if (repo === 'test_repo') {
            dispatch(fetchBranchesSuccess([
                { name: 'master', id: '1' }
            ]));
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/branches`);
            const branches = await response.json();
            if (branches.output) {
                const branchArr = branches.output.filter((branch:string) => branch);
                dispatch(fetchBranchesSuccess(branchArr));
            } else {
                dispatch(fetchBranchesFailure(branches.error));
            }
        } catch (e) {
            dispatch(fetchBranchesFailure(e));
        }
    }
};
