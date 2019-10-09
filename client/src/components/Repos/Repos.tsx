import React, { useEffect, FC } from 'react';
import { compose } from '@bem-react/core';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../store/repos/repos.actions';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';
import SectionPresenter from '../Section/Section';

const Section = compose(withSectionIndentHXxl)(SectionPresenter);

const Repos: FC<{}> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRepo(''));
    }, [dispatch]);
    return (
        <Section indentH='xxl'>
            <div style={{ padding: '20px 0'}} className='MainPage'>Select repository</div>
        </Section>
    );
};

export default Repos;
