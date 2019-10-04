import filesTypes from './files.types';

export const fetchFilesStart = () => ({
    type: filesTypes.FETCH_FILES_START,
});

export const fetchFilesSuccess = (files) => ({
    type: filesTypes.FETCH_FILES_SUCCESS,
    payload: files
});

export const fetchFilesFailure = (error) => ({
    type: filesTypes.FETCH_FILES_FAILURE,
    payload: error
});

export const fetchFilesStartAsync = (repo, branch) => {
    return async (dispatch) => {
        dispatch(fetchFilesStart());
        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/tree/${branch}`);
            const files = await response.json();
            if (files.output) {
                dispatch(fetchFilesSuccess(files.output));
            } else {
                dispatch(fetchFilesFailure(files.error));
            }
        } catch (e) {
            dispatch(fetchFilesFailure(e));
        }
    }
};
