import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import Tabs from '../Tabs/Tabs';
import BranchNav from '../BranchNav/BranchNav';

import { fetchBranchesStartAsync } from '../../store/branch/branch.actions';
import { fetchFilesStartAsync } from '../../store/files/files.actions';
import { setRepo } from '../../store/repos/repos.actions';
import { setBranch } from '../../store/branch/branch.actions';

const tabs = [
    {
        id: 1,
        name: 'files'
    },
    {
        id: 2,
        name: 'branches'
    }
];

const Repo = ({activeTab, branchName, onTabClick, onSelectBranch, match }) => {
    const branches = useSelector(state => state.branch).branches;
    const repo = useSelector(state => state.repos).repo;
    const files = useSelector(state => state.files).files;
    const dispatch = useDispatch();

    // console.log(repo);
    // console.log(files);
    // console.log(branch);

    useEffect(() => {
        // console.log(match.params.repo);
        dispatch(setRepo(match.params.repo));
        dispatch(setBranch(match.params.branch));
        dispatch(fetchFilesStartAsync(match.params.repo, match.params.branch));
        dispatch(fetchBranchesStartAsync(match.params.repo));
    }, []);

    useEffect(() => {
        if (repo) {
            dispatch(fetchFilesStartAsync(repo, match.params.branch));
            dispatch(fetchBranchesStartAsync(repo));
        }
    }, [repo, match.params.branch]);

    return (
        <div>
            <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Table
                className={cnHomePage('Table')}
                tableData={activeTab === 1 ? { head: ['Name'], body: files, type: 'files' } : { head: ['Name'], body: branches, type: 'branches' }}
                iconType={activeTab === 1 ? 'dir' : 'branch'}
                tableType={activeTab === 1 ? 'file' : 'branch'}
                branchName={branchName}
            />
        </div>
    );
};

export default Repo;
