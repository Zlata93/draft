import React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import './HomePage.scss';

import SectionPresenter from '../../components/Section/Section';
import { withSectionIndentHXxl } from '../../components/Section/_indent-h/Section_indent-h_xxl';

const cnHomePage = cn('HomePage');
const Section = compose(withSectionIndentHXxl)(SectionPresenter);

const HomePage = () => {
    return (
        <div className={cnHomePage()}>
            <Section indentH='xxl' className={cnHomePage('Section')}>Hi</Section>
        </div>
    );
};

export default HomePage;
