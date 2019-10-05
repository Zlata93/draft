import filesTypes from './files.types';

const initialState = {
    isFetching: false,
    files: [],
    error: null
};

const filesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case filesTypes.FETCH_FILES_START:
            return { ...state, isFetching: true };
        case filesTypes.FETCH_FILES_SUCCESS:
            return { ...state, isFetching: false, files: payload, error: null };
        case filesTypes.FETCH_FILES_FAILURE:
            return { ...state, isFetching: false, error: payload, files: [] };
        default:
            return state;
    }
};

export default filesReducer;
