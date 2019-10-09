export const FETCH_BRANCHES_START = 'FETCH_BRANCHES_START';
export const FETCH_BRANCHES_SUCCESS = 'FETCH_BRANCHES_SUCCESS';
export const FETCH_BRANCHES_FAILURE = 'FETCH_BRANCHES_FAILURE';
export const SET_BRANCH = 'SET_BRANCH';

export interface Branch {
    name: string,
    id: string,
    type?: string;
}

export interface FetchBranchesStart {
    type: typeof FETCH_BRANCHES_START
}

export interface FetchBranchesSuccess {
    type: typeof FETCH_BRANCHES_SUCCESS,
    payload: Branch[]
}

export interface FetchBranchesFailure {
    type: typeof FETCH_BRANCHES_FAILURE,
    payload: string
}

export interface SetBranch {
    type: typeof SET_BRANCH,
    payload: string
}

export type BranchesActionTypes = FetchBranchesStart | FetchBranchesSuccess | FetchBranchesFailure | SetBranch;
