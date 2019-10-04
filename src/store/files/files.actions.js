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
            const response = await fetch(`api/repos/${repo}`);
            const branches = await response.json();
            dispatch(fetchFilesSuccess(branches));
        } catch (e) {
            dispatch(fetchFilesFailure(e));
        }
    }
};
