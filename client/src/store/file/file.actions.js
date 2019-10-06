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

        const paramsArr = url.split('/');
        const [, repo, branch] = paramsArr;
        const path = paramsArr.slice(3).join('/');

        if (repo === 'test_repo') {
            if (path.toLowerCase().includes('readme')) {
                dispatch(fetchFileSuccess('his project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\n\n## vailable Scripts\n\nIn the project directory, you can run:\n\n### npm start \n\nuns the app in the development mode.br>\nOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.'));
                return;
            }
            dispatch(fetchFileSuccess('import React from \'react\';\nimport HomePage from \'./components/HomePage/HomePage\';\nmport \'./App.css\';\n\nfunction App() {\n\treturn (\n\t\tdiv className=\'\'>\n\t\t\tHomePage />\n\t\t</div>\n\t);\n}\n\nexport default App;\n'));
            return;
        }

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
