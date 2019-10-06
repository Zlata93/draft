import commitsTypes from './commits.types';

export const fetchCommitsStart = () => ({
    type: commitsTypes.FETCH_COMMITS_START
});

export const fetchCommitsSuccess = (commits) => ({
    type: commitsTypes.FETCH_COMMITS_SUCCESS,
    payload: commits
});

export const fetchCommitsFailure = (error) => ({
    type: commitsTypes.FETCH_COMMITS_FAILURE,
    payload: error
});

export const fetchCommitsStartAsync = (repo, branch) => {
    return async (dispatch) => {
        dispatch(fetchCommitsStart());

        if (repo === 'test_repo') {
            dispatch(fetchCommitsSuccess(['118df9069cdd32a5469f3370145580b323409004 02-Oct-2019 18:06 Zlata Kotlova']));
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/repos/${repo}/commits/${branch}`);
            const commits = await response.json();
            if (commits.output) {
                dispatch(fetchCommitsSuccess(commits.output));
            } else {
                dispatch(fetchCommitsFailure(commits.error));
            }
        } catch (e) {
            dispatch(fetchCommitsFailure(e));
        }
    }
};