import fileTypes from './file.types';

export const fetchFileStart = () => ({
    type: fileTypes.FETCH_FILE_START,
});

export const fetchFileSuccess = (file) => ({
    type: fileTypes.FETCH_FILE_SUCCESS,
    payload: file
});

export const fetchFileFailure = (error) => ({
    type: fileTypes.FETCH_FILE_FAILURE,
    payload: error
});

export const fetchFileStartAsync = (url) => {
    return async (dispatch) => {
        dispatch(fetchFileStart());
        // console.log(url.split('/'))
        const paramsArr = url.split('/');
        const [, repo, branch] = paramsArr;
        const path = paramsArr.slice(3).join('/');
        // console.log(path)
        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/blob/${branch}/${path}`);
            const file = await response.json();
            if (file.output) {
                dispatch(fetchFileSuccess(file.output));
            } else {
                dispatch(fetchFileFailure(file.error));
            }
        } catch (e) {
            dispatch(fetchFileFailure(e));
        }
    }
};
