import { FETCH_FILE_START, FETCH_FILE_SUCCESS, FETCH_FILE_FAILURE, FileActionTypes } from './file.types';

export interface FileState {isFetching: boolean,
    file: string
    error: null | string
}

const initialState: FileState = {
    isFetching: false,
    file: '',
    error: null
};

const fileReducer = (
    state = initialState,
    action:FileActionTypes
) => {
    switch (action.type) {
        case FETCH_FILE_START:
            return { ...state, isFetching: true, file: '' };
        case FETCH_FILE_SUCCESS:
            return { ...state, isFetching: false, file: action.payload, error: null };
        case FETCH_FILE_FAILURE:
            return { ...state, isFetching: false, error: action.payload, file: '' };
        default:
            return state;
    }
};

export default fileReducer;
