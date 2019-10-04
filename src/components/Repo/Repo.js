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
    //     name: 'branches'
    // }
];

const Repo = ({activeTab, branchName, onTabClick, onSelectBranch, match, location }) => {
    const branches = useSelector(state => state.branch).branches;
    const repo = useSelector(state => state.repos).repo;
    const files = useSelector(state => state.files).files;
    const file = useSelector(state => state.file).file;
    const dispatch = useDispatch();

    // console.log(repo);
    // console.log(files);
    // console.log(branch);
    console.log(location.pathname);

    useEffect(() => {
        if (location.pathname.includes('.')) {
            dispatch(fetchFileStartAsync(location.pathname));
            return;
        }
        // console.log(location.pathname);
        dispatch(setRepo(match.params.repo));
        dispatch(setBranch(match.params.branch));
        dispatch(fetchFilesStartAsync(location.pathname));
        // dispatch(fetchFilesStartAsync(match.params.repo, match.params.branch));
        dispatch(fetchBranchesStartAsync(match.params.repo));
    }, []);

    useEffect(() => {
        if (repo) {
            console.log('effect')
            if (location.pathname.includes('.')) {
                dispatch(fetchFileStartAsync(location.pathname));
                return;
            }
            console.log('dispatch')
            dispatch(fetchFilesStartAsync(location.pathname));
            // dispatch(fetchFilesStartAsync(repo, match.params.branch));
            dispatch(fetchBranchesStartAsync(repo));
        }
    }, [location.pathname]);

    if (location.pathname.includes('.')) {
        return (
            <div>
                <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
                <Tabs tabs={tabs2} activeTab={activeTab} handleClick={onTabClick}/>
                <p dangerouslySetInnerHTML={{__html: file }}/>
                {/*<p dangerouslySetInnerHTML={{__html: file }}>{file}</p>*/}
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
