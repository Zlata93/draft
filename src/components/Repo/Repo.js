import React, { useEffect } from 'react';
import { compose } from '@bem-react/core';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import BranchNav from '../BranchNav/BranchNav';
import FileContent from '../FileContent/FileContent';
import SectionPresenter from '../Section/Section';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';

import { fetchCommitsStartAsync } from '../../store/commits/commits.actions';
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

const Section = compose(withSectionIndentHXxl)(SectionPresenter);

const Repo = ({activeTab, onTabClick, onSelectBranch, match, location }) => {
    const lastCommit = useSelector(state => state.commits).commits[0];
    const branches = useSelector(state => state.branch).branches;
    const branch = useSelector(state => state.branch).branch;
    const repo = useSelector(state => state.repos).repo;
    const files = useSelector(state => state.files).files;
    const file = useSelector(state => state.file).file;
    const dispatch = useDispatch();

    useEffect(() => {
        const { repo, branch } = match.params;
        dispatch(setRepo(repo));
        dispatch(setBranch(branch));
        dispatch(fetchCommitsStartAsync(repo, branch));
    }, []);

    useEffect(() => {
        const { pathname, state } = location;
        if (repo) {
            if (state && state.type === 'file') {
                dispatch(fetchFileStartAsync(pathname));
                return;
            }
            dispatch(fetchFilesStartAsync(pathname));
        }
    }, [location.pathname, repo, branch]);

    useEffect(() => {
        if (repo) {
            dispatch(fetchBranchesStartAsync(repo));
        }
    }, [repo]);

    if (location.pathname.includes('.')) {
        const pathArr = location.pathname.split('/');
        const fileName = pathArr[pathArr.length - 1];
        return (
            <FileContent
                branchName={branch}
                onSelectBranch={onSelectBranch}
                lastCommit={lastCommit}
                activeTab={activeTab}
                onTabClick={onTabClick}
                fileName={fileName}
                file={file}
            />
        );
    }

    return (
        <Section indentH='xxl'>
            <BranchNav onSelect={onSelectBranch} lastCommit={lastCommit}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Table
                className={cnHomePage('Table')}
                tableData={activeTab === 1 ?
                    { head: ['Name'], body: files, type: 'files' } :
                    { head: ['Name'], body: branches, type: 'branches' }}
                iconType={activeTab === 1 ? 'dir' : 'branch'}
                tableType={activeTab === 1 ? 'file' : 'branch'}
            />
        </Section>
    );
};

export default Repo;
