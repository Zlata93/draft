import React, { useEffect, lazy, Suspense, FC } from 'react';
import { compose } from '@bem-react/core';
import { AppState } from "../../store";
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '../Tabs/Tabs';
import Spinner from '../Spinner/Spinner';
import BranchNav from '../BranchNav/BranchNav';
import SectionPresenter from '../Section/Section';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';

import { fetchCommitsStartAsync } from '../../store/commits/commits.actions';
import { fetchBranchesStartAsync } from '../../store/branch/branch.actions';
import { fetchFilesStartAsync } from '../../store/files/files.actions';
import { fetchFileStartAsync } from '../../store/file/file.actions';
import { setRepo } from '../../store/repos/repos.actions';
import { setBranch } from '../../store/branch/branch.actions';

const Table = lazy(() => import('../Table/Table'));
const FileContent = lazy(() => import('../FileContent/FileContent'));

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

type PathParamsType = {
    repo: string;
    branch: string;
}

export interface RepoProps extends RouteComponentProps<PathParamsType> {
    activeTab: number;
    onTabClick: (id: number) => void;
    onSelectBranch: (name: string) => void;
}

const Repo: FC<RepoProps> = ({activeTab, onTabClick, onSelectBranch, match, location }) => {
    const lastCommit = useSelector((state: AppState) => state.commits).commits[0];
    const branches = useSelector((state: AppState) => state.branch).branches;
    const branch = useSelector((state: AppState) => state.branch).branch;
    const repo = useSelector((state: AppState) => state.repos).repo;
    const files = useSelector((state: AppState) => state.files).files;
    const file = useSelector((state: AppState) => state.file).file;
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
            <Suspense fallback={<Spinner/>}>
                <FileContent
                    // branchName={branch}
                    onSelectBranch={onSelectBranch}
                    lastCommit={lastCommit}
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                    fileName={fileName}
                    file={file}
                />
            </Suspense>
        );
    }

    return (
        <Section indentH='xxl'>
            <BranchNav onSelect={onSelectBranch} lastCommit={lastCommit}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Suspense fallback={<Spinner/>}>
                <Table
                    className={cnHomePage('Table')}
                    tableData={activeTab === 1 ?
                        { head: ['Name'], body: files, type: 'files' } :
                        { head: ['Name'], body: branches, type: 'branches' }}
                    iconType={activeTab === 1 ? 'dir' : 'branch'}
                    tableType={activeTab === 1 ? 'file' : 'branch'}
                />
            </Suspense>
        </Section>
    );
};

export default Repo;
