export const FETCH_FILE_START = 'FETCH_FILE_START';
export const FETCH_FILE_SUCCESS = 'FETCH_FILE_SUCCESS';
export const FETCH_FILE_FAILURE = 'FETCH_FILE_FAILURE';

export interface FetchFileStart {
    type: typeof FETCH_FILE_START
}

export interface FetchFileSuccess {
    type: typeof FETCH_FILE_SUCCESS,
    payload: string
}

export interface FetchFileFailure {
    type: typeof FETCH_FILE_FAILURE,
    payload: string
}

export type FileActionTypes = FetchFileStart | FetchFileSuccess | FetchFileFailure;

