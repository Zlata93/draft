import reposTypes from './repos.types';

export const fetchReposStart = () => ({
    type: reposTypes.FETCH_REPOS_START
});

export const fetchReposSuccess = (repos) => ({
    type: reposTypes.FETCH_REPOS_SUCCESS,
    payload: repos
});

export const fetchReposFailure = (error) => ({
    type: reposTypes.FETCH_REPOS_FAILURE,
    payload: error
});

export const setRepo = (repo) => ({
    type: reposTypes.SET_REPO,
    payload: repo
});

export const fetchReposStartAsync = () => {
    return async (dispatch) => {
        dispatch(fetchReposStart());

        try {
            const response = await fetch('/api/repos');
            const repos = await response.json();
            dispatch(fetchReposSuccess(repos.repos));
        } catch (e) {
            dispatch(fetchReposFailure(e));
        }
    }
};
