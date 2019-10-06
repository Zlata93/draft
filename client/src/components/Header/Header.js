import React from 'react';
import { compose } from '@bem-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@bem-react/classname';
import './Header.scss';

import { setRepo } from '../../store/repos/repos.actions';
import { setBranch } from '../../store/branch/branch.actions';
import { fetchCommitsStartAsync } from '../../store/commits/commits.actions';

import { withSelectSizeS } from '../Select/_size/Select_size_s';
import SelectPresenter from '../Select/Select';

export const cnHeader = cn('Header');

const Select = compose(withSelectSizeS)(SelectPresenter);

const Header = () => {
    const dispatch = useDispatch();
    const repo = useSelector(state => state.repos).repo;
    const branch = useSelector(state => state.branch).branch;
    const options = useSelector(state => state.repos).repos;

    const onSelect = (repo) => {
        dispatch(setRepo(repo));
        dispatch(setBranch('master'));
        dispatch(fetchCommitsStartAsync(repo, branch));
    };

    return (
        <header className={cnHeader()}>
            <div className={cnHeader('Logo')}/>
            <Select
                size='s'
                type='repo'
                options={options}
                activeOption={repo}
                className={cnHeader('Select')}
                name='Repository'
                onSelect={onSelect}
            />
        </header>
    );
};

export default Header;