import { Action } from 'redux';
import { AppState } from "../index";
import { ThunkAction } from 'redux-thunk';
import { FETCH_REPOS_START, FETCH_REPOS_SUCCESS, FETCH_REPOS_FAILURE, SET_REPO, ReposActionTypes } from './repos.types';

export const fetchReposStart = ():ReposActionTypes => ({
    type: FETCH_REPOS_START
});

export const fetchReposSuccess = (repos: string[]):ReposActionTypes => ({
    type: FETCH_REPOS_SUCCESS,
    payload: repos
});

export const fetchReposFailure = (error: string):ReposActionTypes => ({
    type: FETCH_REPOS_FAILURE,
    payload: error
});

export const setRepo = (repo: string):ReposActionTypes => ({
    type: SET_REPO,
    payload: repo
});

export const fetchReposStartAsync = ():ThunkAction<void, AppState, null, Action<string>> => {
    return async (dispatch) => {
        dispatch(fetchReposStart());

        try {
            const response = await fetch('http://localhost:5000/api/repos');
            const repos = await response.json();
            dispatch(fetchReposSuccess(repos));
        } catch (e) {
            dispatch(fetchReposFailure(e));
        }
    }
};
