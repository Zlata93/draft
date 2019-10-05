import React, { useEffect } from 'react';
import { compose } from '@bem-react/core';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import BranchNav from '../BranchNav/BranchNav';
import SectionPresenter from '../Section/Section';
import EditorPresenter from '../Editor/Editor';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';
import { withEditorBorderFaded } from '../Editor/_border/Editor_border_faded';
import { withSectionIndentHXxl0 } from '../Section/_indent-h/Section_indent-h_xxl0';
import { withSectionIndentVM } from '../Section/_indent-v/Section_indent-v_m';

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

const Section = compose(withSectionIndentHXxl)(SectionPresenter);
const SectionEditor = compose(withSectionIndentHXxl0, withSectionIndentVM)(SectionPresenter);
const Editor = compose(withEditorBorderFaded)(EditorPresenter);

// Section_indent-t_m Section_indent-b_m Editor Editor_border_faded Editor_indent-h_xxl

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
        const pathArr = location.pathname.split('/');
        const fileName = pathArr[pathArr.length - 1];
        return (
            <>
                <Section indentH='xxl'>
                    <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
                    <Tabs tabs={tabs2} activeTab={activeTab} handleClick={onTabClick}/>
                </Section>
                <SectionEditor indentH='xxl0' indentV='m'>
                    <Editor
                        border='faded'
                        headerColor='default'
                        headerIndentH='m'
                        headerIndentV='s'
                        fileName={fileName}
                        code={file}
                    />
                </SectionEditor>
            </>
        );
    }

    return (
        <Section indentH='xxl'>
            <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Table
                className={cnHomePage('Table')}
                tableData={activeTab === 1 ? { head: ['Name'], body: files, type: 'files' } : { head: ['Name'], body: branches, type: 'branches' }}
                iconType={activeTab === 1 ? 'dir' : 'branch'}
                tableType={activeTab === 1 ? 'file' : 'branch'}
            />
        </Section>
    );
};

export default Repo;
