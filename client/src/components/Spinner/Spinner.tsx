import React from 'react';
import { compose } from '@bem-react/core';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';
import { withSectionIndentVM } from '../Section/_indent-v/Section_indent-v_m';
import SectionPresenter from '../Section/Section';
import './Spinner.scss';

const Section = compose(withSectionIndentHXxl, withSectionIndentVM)(SectionPresenter);

const Spinner: React.FC<{}> = () => {
    return (
        <Section indentH='xxl' indentV='m'>
            Loading...
        </Section>
    );
};

export default Spinner;
