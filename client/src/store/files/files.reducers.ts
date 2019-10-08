import { FETCH_FILES_START, FETCH_FILES_SUCCESS, FETCH_FILES_FAILURE, FilesActionTypes, File } from './files.types';

export interface FilesState {
    isFetching: boolean,
    files: File[],
    error: null | string
}

const initialState: FilesState = {
    isFetching: false,
    files: [],
    error: null
};

const filesReducer = (
    state = initialState,
    action: FilesActionTypes
) => {
    switch (action.type) {
        case FETCH_FILES_START:
            return { ...state, isFetching: true };
        case FETCH_FILES_SUCCESS:
            return { ...state, isFetching: false, files: action.payload, error: null };
        case FETCH_FILES_FAILURE:
            return { ...state, isFetching: false, error: action.payload, files: [] };
        default:
            return state;
    }
};

export default filesReducer;
