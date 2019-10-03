import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { cnHomePage } from '../../pages/HomePage/HomePage';
import Tabs from '../Tabs/Tabs';
import BranchNav from '../BranchNav/BranchNav';

const fileTable = {
    type: 'files',
    head: ['Name', 'Last commit', 'Commit message', 'Committer', 'Updated'],
    body: [
        {
            name: 'api',
            commit: 'd53dsv',
            message: '[vcs] move http to arc',
            committer: 'noxoomo',
            updated: '4 s ago'
        },
        {
            name: 'ci',
            commit: 'c53dsv',
            message: '[vcs] test for empty commit message',
            committer: 'nikitxskv',
            updated: '1 min ago'
        },
        {
            name: 'contrib',
            commit: 's53dsv',
            message: '[vcs] change owner to g:arc',
            committer: 'nalpp',
            updated: '16:25'
        },
        {
            name: 'http',
            commit: 'd53dsv',
            message: '[vcs] move http to arc',
            committer: 'somov',
            updated: 'Yesterday, 14:50'
        },
        {
            name: 'README.md',
            commit: 's53dsv',
            message: '[vcs] change owner to g:arc',
            committer: 'deshevoy',
            updated: 'Jan 11, 12:01'
        },
        {
            name: 'ya.make',
            commit: 'd53dsv',
            message: '[vcs] change owner to g:arc',
            committer: 'nikitxskv',
            updated: '16:25'
        }
    ]
};

const branchTable = {
    type: 'branches',
    head: ['Name', 'Commit hash'],
    body: [
        {
            name: 'trunk',
            commit: '6748ds893432438dsd823329d923482d'
        },
        {
            name: 'users/a-aidyn00/my-feature-2',
            commit: '7748ds893432438dsd823329d923482d'
        },
        {
            name: 'users/a-aidyn00/my-feature-3',
            commit: '8748ds893432438dsd823329d923482d'
        },
        {
            name: 'users/a-aidyn00/my-feature-4',
            commit: '9748ds893432438dsd823329d923482d'
        },
        {
            name: 'users/a-aidyn00/my-feature-5',
            commit: '1748ds893432438dsd823329d923482d'
        }
    ]
};

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

const Repo = ({activeTab, branchName, onTabClick, onSelectBranch }) => {
    const branch = useSelector(state => state.branch).branch;

    return (
        <div>
            <BranchNav branchName={branchName} onSelect={onSelectBranch}/>
            <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick}/>
            <Table
                className={cnHomePage('Table')}
                tableData={activeTab === 1 ? fileTable : branchTable}
                iconType={activeTab === 1 ? 'dir' : 'branch'}
                tableType={activeTab === 1 ? 'file' : 'branch'}
                branchName={branchName}
            />
        </div>
    );
};

export default Repo;
