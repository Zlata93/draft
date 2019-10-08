export const FETCH_COMMITS_START = 'FETCH_COMMITS_START';
export const FETCH_COMMITS_SUCCESS = 'FETCH_COMMITS_SUCCESS';
export const FETCH_COMMITS_FAILURE = 'FETCH_COMMITS_FAILURE';

export interface FetchCommitsStart {
    type: typeof FETCH_COMMITS_START
}

export interface FetchCommitsSuccess {
    type: typeof FETCH_COMMITS_SUCCESS,
    payload: string[]
}

export interface FetchCommitsFailure {
    type: typeof FETCH_COMMITS_FAILURE,
    payload: string
}

export type CommitsActionTypes = FetchCommitsStart | FetchCommitsSuccess | FetchCommitsFailure;
