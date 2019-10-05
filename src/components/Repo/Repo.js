import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import Tabs from '../Tabs/Tabs';
import BranchNav from '../BranchNav/BranchNav';

import { fetchBranchesStartAsync } from '../../store/branch/branch.actions';
import { fetchFilesStartAsync } from '../../store/files/files.actions';
import { fetchFileStartAsync } from '../../store/file/file.actions';
import { setRepo } from '../../store/repos/repos.actions';
import { setBranch } from '../../store/branch/branch.actions';

const tabs = [
    {
        id: 1,
        name: 'files'
    },
    // {
    //     id: 2,
    //     name: 'branches'
    // }
];

const tabs2 = [
    {
        id: 1,
        name: 'details'
    },
    // {
    //     id: 2,
    //     name: 'history'
    // }
];

const Repo = ({activeTab, branchName, onTabClick, onSelectBranch, match, location }) => {
    const branches = useSelector(state => state.branch).branches;
    const branch = useSelector(state => state.branch).branch;
    const repo = useSelector(state => state.repos).repo;
    const files = useSelector(state => state.files).files;
    const file = useSelector(state => state.file).file;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRepo(match.params.repo));
        dispatch(setBranch(match.params.branch));
    }, []);

    useEffect(() => {
        if (repo) {
            if (location.pathname.includes('.')) {
                dispatch(fetchFileStartAsync(location.pathname));
                return;
            }
            dispatch(fetchFilesStartAsync(location.pathname));
        }
    }, [location.pathname, repo, branch]);

    useEffect(() => {
        if (repo) {
            dispatch(fetchBranchesStartAsync(repo));
        }
    }, [repo]);

    if (location.pathname.includes('.')) {
        return (
            <div>
                <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
                <Tabs tabs={tabs2} activeTab={activeTab} handleClick={onTabClick}/>
                {/*<p dangerouslySetInnerHTML={{__html: file }}/>*/}
                <p>
                    <pre>{file}</pre>
                </p>
            </div>
        );
    }

    return (
        <div>
            <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Table
                className={cnHomePage('Table')}
                tableData={activeTab === 1 ? { head: ['Name'], body: files, type: 'files' } : { head: ['Name'], body: branches, type: 'branches' }}
                iconType={activeTab === 1 ? 'dir' : 'branch'}
                tableType={activeTab === 1 ? 'file' : 'branch'}
            />
        </div>
    );
};

export default Repo;
