import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import './HomePage.scss';

import SectionPresenter from '../../components/Section/Section';
import { withSectionIndentHXxl } from '../../components/Section/_indent-h/Section_indent-h_xxl';
import Subheader from '../../components/Subheader/Subheader';
import BranchNav from '../../components/BranchNav/BranchNav';
import Tabs from '../../components/Tabs/Tabs';

const cnHomePage = cn('HomePage');
const Section = compose(withSectionIndentHXxl)(SectionPresenter);

const HomePage = () => {
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
                Hi
            </Section>
        </div>
    );
};

export default HomePage;
