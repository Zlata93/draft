export const FETCH_REPOS_START = 'FETCH_REPOS_START';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export const SET_REPO = 'SET_REPO';

export interface FetchReposStart {
    type: typeof FETCH_REPOS_START
}

export interface FetchReposSuccess {
    type: typeof FETCH_REPOS_SUCCESS,
    payload: string[]
}

export interface FetchReposFailure {
    type: typeof FETCH_REPOS_FAILURE,
    payload: string
}

export interface SetRepo {
    type: typeof SET_REPO,
    payload: string
}

export type ReposActionTypes = FetchReposStart | FetchReposSuccess | FetchReposFailure | SetRepo;
