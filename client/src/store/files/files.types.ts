export const FETCH_FILES_START = 'FETCH_FILES_START';
export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
export const FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE';

export interface File {
    name: string,
    id: string,
    type: string
}

export interface FetchFilesStart {
    type: typeof FETCH_FILES_START
}

export interface FetchFilesSuccess {
    type: typeof FETCH_FILES_SUCCESS,
        payload: File[]
}

export interface FetchFilesFailure {
    type: typeof FETCH_FILES_FAILURE,
        payload: string
}

export type FilesActionTypes = FetchFilesStart | FetchFilesSuccess | FetchFilesFailure;

