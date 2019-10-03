import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import './HomePage.scss';

import SectionPresenter from '../../components/Section/Section';
import { withSectionIndentHXxl } from '../../components/Section/_indent-h/Section_indent-h_xxl';
import Subheader from '../../components/Subheader/Subheader';
import BranchNav from '../../components/BranchNav/BranchNav';
import Table from '../../components/Table/Table';
import Tabs from '../../components/Tabs/Tabs';

const cnHomePage = cn('HomePage');
const Section = compose(withSectionIndentHXxl)(SectionPresenter);

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

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const onTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className={cnHomePage()}>
            <Section indentH='xxl' className={cnHomePage('Section')}>
                <Subheader>
                    arcadia
                </Subheader>
                <BranchNav/>
                <Tabs tabs={tabs} activeTab={activeTab} handleClick={onTabClick} />
                <div>
                    <Table
                        className={activeTab === 1 ?
                            cnHomePage('Table') :
                            cnHomePage('Table')
                        }
                        tableData={activeTab === 1 ? fileTable : branchTable}
                        iconType={activeTab === 1 ? 'dir' : 'branch'}
                        tableType={activeTab === 1 ? 'file' : 'branch'}
                    />
                </div>
            </Section>
        </div>
    );
};

export default HomePage;
