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

export const fetchFilesStartAsync = (url) => {
    return async (dispatch) => {

        const paramsArr = url.split('/');
        const [, repo, branch] = paramsArr;
        const path = paramsArr.slice(3).join('/');

        if (repo === 'test_repo') {
            if (!path) {
                dispatch(fetchFilesStart());
                dispatch(fetchFilesSuccess([
                    { name: 'src', id: 1, type: 'dir'},
                    { name: 'README.md', id: 2, type: 'file'}
                ]));
                return;
            }
            dispatch(fetchFilesStart());
            dispatch(fetchFilesSuccess([
                { name: 'test.js', id: 1, type: 'file' }
            ]));
            return;
        }
        dispatch(fetchFilesStart());

        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/tree/${branch}/${path}`);
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