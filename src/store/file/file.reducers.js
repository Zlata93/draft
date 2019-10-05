import fileTypes from './file.types';

const initialState = {
    isFetching: false,
    file: '',
    error: null
};

const fileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case fileTypes.FETCH_FILE_START:
            return { ...state, isFetching: true, file: '' };
        case fileTypes.FETCH_FILE_SUCCESS:
            return { ...state, isFetching: false, file: payload, error: null };
        case fileTypes.FETCH_FILE_FAILURE:
            return { ...state, isFetching: false, error: payload, file: '' };
        default:
            return state;
    }
};

export default fileReducer;
